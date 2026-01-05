import { Request, Response } from "express";
import { prisma } from '../prisma/prisma'

// Apply to a job (with resume PDF)
export const applyJob = async (req: Request, res: Response) => {
  const { fullName, email, message, jobId } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Resume PDF is required" });
  }
console.log(req);
  const application = await prisma.application.create({
    data: {
      fullName,
      email,
      message: message || "",
      resumePath: req.file.path,
      jobId: jobId ? Number(jobId) : null,
    },
  });

  res.status(201).json({ message: "Application submitted", application });
};

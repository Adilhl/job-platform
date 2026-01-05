import {Request, Response} from "express";
import { prisma } from '../prisma/prisma'
import {AuthRequest} from "../middlewares/auth"

export const createJob = async (req:AuthRequest, res: Response) => {
    const { title, description, location, type} = req.body;
    if( !title || !description || !location || !type){
        return res.status(400).json({message: " All fields are required!"});
    }

    const job = await prisma.job.create({
        data: { title, description, location, type},
    });
    res.status(201).json({message: "Job created sucsufly", data: job});
}

export const listJobs = async (_req: Request, res: Response) => {
    const jobs = await prisma.job.findMany({
        where: {isActive: true},
        orderBy: {createdAt: "desc"},
    });
    res.json(jobs);
}

export const getJob = async(req:Request, res: Response) =>{
    const {id} = req.params;
    const job = await prisma.job.findUnique({
        where: {id: Number(id)},
    });
    if(!job) return res.status(404).json({message: "Job not found!"});
    res.json(job);
}

// Update job (Admin only)
export const updateJob = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, location, type, isActive } = req.body;

  const job = await prisma.job.update({
    where: { id: Number(id) },
    data: { title, description, location, type, isActive },
  });

  res.json(job);
};

// Delete job (Admin only)
export const deleteJob = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await prisma.job.delete({ where: { id: Number(id) } });
  res.json({ message: "Job deleted" });
};
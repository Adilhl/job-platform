import {Router} from "express";

import { createJob, listJobs, getJob, updateJob, deleteJob } from "../controllers/job.controllers";
import { authentificate } from "../middlewares/auth";
import { resumeUpload } from "../utils/multer";
import { applyJob } from "../controllers/application.controller";
const router = Router();

//public route
router.get('/', listJobs);
router.get("/:id", getJob);

// Apply to job
router.post("/:id/apply", resumeUpload.single("resume"), applyJob);
//Admin route
router.post("/", authentificate, createJob);
router.put("/:id", authentificate, updateJob);
router.delete("/:id", authentificate, deleteJob);
export default router;
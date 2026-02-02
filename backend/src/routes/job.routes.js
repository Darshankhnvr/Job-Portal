import express from "express"
import { createJob, deleteJob, getAllJobs, getJobById, updateJob } from "../controllers/job.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js"

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("admin"), createJob);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateJob);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteJob);

router.get("/", getAllJobs)
router.get("/:id", getJobById)

export default router;
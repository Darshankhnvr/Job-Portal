import express from "express"
import { applyJob, getApplications, getJobApplicants } from "../controllers/application.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js"

const router = express.Router();

router.post("/apply/:id", authMiddleware, roleMiddleware("user"), upload.single("resume"), applyJob);
router.get("/my-applications", authMiddleware, roleMiddleware("user"), getApplications)
router.get("/job/:id/applicants", authMiddleware, roleMiddleware("admin"), getJobApplicants)

export default router;
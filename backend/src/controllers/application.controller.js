import Job from '../models/job.model.js'
import Application from '../models/application.model.js'
export const applyJob = async (req, res) => {
    const job = await Job.findById(req.params.id)

    if (!job) {
        return res.status(401).json({ message: "Job not found" })
    }

    const alreadyApplied = await Application.findOne({
        jobId: job._id,
        userId: req.user.id
    })

    if (alreadyApplied) {
        return res.status(200).json({ message: "You have already applied for this job" })
    }

    if (!req.file) {
        return res.status(401).json({ message: "Resume is required" })
    }

    const application = await Application.create({
        jobId: job._id,
        userId: req.user.id,
        resumeUrl: req.file.path
    })

    res.status(201).json(application);
}

export const getApplications = async (req, res) => {
    const applications = await Application.find({
        userId: req.user.id
    }).populate("jobId")

    res.json(applications)

}

export const getJobApplicants = async (req, res) => {
    const applicants = await Application.find({
        jobId: req.params.id
    }).populate("userId", "name email")

    res.json(applicants)
}
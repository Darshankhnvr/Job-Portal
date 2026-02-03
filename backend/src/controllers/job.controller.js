import Job from "../models/job.model.js"
export const createJob = async (req, res) => {
    const { title, location, company, description } = req.body;

    if (!title || !description || !company || !location) {
        return res.status(200).json({ message: "All fields are required" })
    }

    const job = await Job.create({
        title,
        location,
        company,
        description,
        createdBy: req.user.id
    })

    res.status(201).json(job)
}

export const updateJob = async (req, res) => {

    const job = await Job.findById(req.params.id);

    if (!job) {
        return res.status(400).json({ message: "Job not found" })
    }

    if (job.createdBy.toString() !== req.user.id) {
        return res.status(400).json({ message: "You are not authorized to update this job" })
    }

    Object.assign(job, req.body);
    await job.save();

    res.json(job)
}

export const deleteJob = async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        return res.status(400).json({ message: "Job not found" })
    }

    if (job.createdBy.toString() !== req.user.id) {
        return res.status(400).json({ message: "You are not authorized to update this job" })
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" })
}

export const getAllJobs = async(req, res) =>{
    const jobs = await Job.find().sort({createdAt : -1})
    res.json(jobs)
}

export const getJobById = async(req, res) =>{
    const job = await Job.findById(req.params.id)

    if(!job)
    {
        res.status(400).json({message:"Job not found"})
    }

    res.json(job);
}
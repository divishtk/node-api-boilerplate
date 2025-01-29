import { Jobs } from "../models/jobs.models.js";

const createJobsController = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return next("Company name and position is required");
  }
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(201).json({ job });
};

const getAllJobsController = async (req, res) => {
  const getAllJobs = await Jobs.find({ createdBy: req.user.userId });
  res.status(200).json({ totalJobs: getAllJobs.length,
     getAllJobs });
};

export { createJobsController, getAllJobsController };

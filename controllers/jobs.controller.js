import mongoose from "mongoose";
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
  res.status(200).json({ totalJobs: getAllJobs.length, getAllJobs });
};

const updateJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company, position } = req.body;
    if (!company || !position) {
      return next("Company name and position is required");
    }
    const findJob = await Jobs.findOne({ _id: id });
    if (!findJob) {
      return next(`Job with id ${id} not found`);
    }
    if (!req.user.userid === findJob.createdBy.toString()) {
      return next(`You are not authorized to update this job`);
    }
    const updateJob = await Jobs.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ updateJob });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  const findJob = await Jobs.findOne({ _id: id });
  if (!findJob) {
    return next(`Job with id ${id} not found`);
  }
  if (!req.user.userid === findJob.createdBy.toString()) {
    return next(`You are not authorized to delete this job`);
  }
  // const deleteJob = await Jobs.findByIdAndDelete(id);
  //alternate to delete
  await Jobs.deleteOne();
  res.status(200).json({ message: "Job deleted successfully" });
};

const jobstatsController = async (req, res) => {
  console.log("r", req.user.userId);
  const jobStats = await Jobs.aggregate([
    //search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const defaultStats = {
    pending: 0,
    interview: 0,
    reject: 0,
  };

  jobStats.forEach((stat) => {
    defaultStats[stat._id] = stat.count || 0;
  });
  res.status(200).json({ totalJobs: defaultStats.length, defaultStats });
};

export {
  createJobsController,
  getAllJobsController,
  updateJobController,
  deleteJobController,
  jobstatsController,
};

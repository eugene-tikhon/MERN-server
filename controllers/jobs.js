import { Job } from "../models/job.js";
import { checkPermissions } from "../utils/checkPermissions.js";

/**
 * createJob
*/
export const createJob = async (req, res, next) => {
  const { company, position } = req.body;

  if (!company || !position) {
    res
      .status(400)
      .json({ err: "Please provide required values: company, position" });
  }

  req.body.createdBy = req.user.userId;

  try {
    const job = new Job(req.body);

    await job.save();
    res.status(201).json({
      isOk: true,
      job,
    });
  } catch (error) {
    next(error); // will be handled by Error-handle middleware
  }
};

/**
 * getAllJobs
*/
export const getAllJobs = async (req, res, next) => {
   
  try {
    const jobs = await Job.find({ createdBy: req.user.userId });
    res.status(201).json({
      isOk: true,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * updateJob
*/
export const updateJob = async (req, res, next) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    res
      .status(400)
      .json({ err: "Please provide required values: company, position" });
  }

  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    res.status(404).json({ err: `No job with id ${jobId}` });
  }

  checkPermissions(req.user.userId, job.createdBy, res);

  try {
    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      isOk: true,
      updatedJob
    });
  } catch (error) {
    next(error);
  }
};

/**
 * updateJob
*/
export const deleteJob = async (req, res, next) => {
  const jobId = req.params.id;

  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    res.status(404).json({ err: `No job with id ${jobId}` });
  }

  checkPermissions(req.user.userId, job.createdBy, res);

  try {
    console.log('delete started')
    await Job.deleteOne({ _id: jobId })
    res.status(201).json({
      isOk: true,
      deleted: jobId 
    });
  } catch (error) {
    next(error);
  }
};

export const showStats = async (req, res, next) => {
    res.send("showStats");
  };
  

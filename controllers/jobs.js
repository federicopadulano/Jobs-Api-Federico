const jobModel = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await jobModel
    .find({ createdBy: req.user.userID })
    .sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getSingleJob = async (req, res) => {
  const id = req.params.id;
  const userID = req.user.userID;
  const job = await jobModel.findOne({ _id: id, createdBy: userID });
  if (!job) {
    throw new NotFoundError(`No job with this id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await jobModel.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};
const updateJob = async (req, res) => {
  const id = req.params.id;
  const userID = req.user.userID;
  const { company, position } = req.body;
  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position cannot be empty");
  }
  const job = await jobModel.findOneAndUpdate(
    { _id: id, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with this id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const id = req.params.id;
  const userID = req.user.userID;
  const job = await jobModel.findOneAndRemove({ _id: id, createdBy: userID });
  if (!job) {
    throw new NotFoundError(`No job with this id: ${id}`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};

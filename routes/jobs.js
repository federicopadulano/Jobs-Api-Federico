const express = require("express");
const jobsRouter = express.Router();
const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

jobsRouter.route("/").get(getAllJobs).post(createJob);
jobsRouter.route("/:id").get(getSingleJob).patch(updateJob).delete(deleteJob);

module.exports = jobsRouter;

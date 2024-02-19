const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  jobDeadline: Date,
  jobDescription: String,
  reqSkills: String,
  jobApply: String,
  salary: String,
  jobType: String,
  companyWeb: String,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'], // Add other possible values if needed
    default: 'Pending', // Set a default value if necessary
  },
  createdAt: { type: Date, default: Date.now },
  sharedBy: String
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;

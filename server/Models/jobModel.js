const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  jobDeadline: Date,
  jobDescription: String,
  reqSkills: String,
  jobApply: String,
  salary: String,
  jobType: String,
  companyWeb: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

const Job = require("../Models/jobModel");

exports.jobShare = async (req, res) => {
  const {
    jobTitle,
    jobDeadline,
    jobDescription,
    reqSkills,
    jobApply,
    salary,
    jobType,
    companyWeb,
    email
  } = req.body;

  try {
    const newJob = new Job({
      jobTitle,
      jobDeadline,
      jobDescription,
      reqSkills,
      jobApply,
      salary,
      jobType,
      companyWeb,
      status: "Pending",
      createdAt: new Date(),
      sharedBy: email
    });

    await newJob.save();
    res.status(201).json({ message: "Job shared successfully" });
  } catch (error) {
    console.error("Error in alumniJobShareController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getJob = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error in alumniJobShareController (getJob):", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateJobStatus = async (req, res) => {
  const { jobId, newStatus } = req.body;

  try {
  
    const updatedJob = await Job.findByIdAndUpdate(jobId, { status: newStatus }, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({ message: 'Job status updated successfully', updatedJob });
  } catch (error) {
    console.error('Error updating job status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



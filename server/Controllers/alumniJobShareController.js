const Job = require('../Models/jobModel');

const alumniJobShareController = async (req, res) => {
  const {
    jobTitle,
    jobDeadline,
    jobDescription,
    reqSkills,
    jobApply,
    salary,
    jobType,
    companyWeb,
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
      status: 'Pending',
      createdAt: new Date(),
    });

    await newJob.save();
    res.status(201).json({ message: 'Job shared successfully' });
  } catch (error) {
    console.error('Error in alumniJobShareController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {alumniJobShareController};

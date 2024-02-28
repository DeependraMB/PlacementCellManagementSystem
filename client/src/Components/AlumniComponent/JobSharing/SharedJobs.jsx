import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';
import axios from 'axios';
import { useAuth } from "../../../Context/AuthContext";

const SharedJobs = () => {
  const [approvedJobs, setApprovedJobs] = useState([]);
  const { auth, setAuth } = useAuth();

  console.log(approvedJobs)

  useEffect(() => {
    fetchApprovedJobs();
  }, []);

  const formData = {
    email: auth.email
  };

  const fetchApprovedJobs = async () => {
    try {
      const response = await axios.post('http://localhost:5000/alumni/get-job-by-Id', formData);
      console.log(response.data.job)
      const jobsArray = Array.isArray(response.data.job) ? response.data.job : [response.data.job];

    setApprovedJobs(jobsArray);
    } catch (error) {
      console.error('Error fetching approved jobs:', error);
    }
  };

  const calculateDaysAgo = (date) => {
    const currentDate = new Date();
    const createdAtDate = new Date(date);
    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysAgo;
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Your Preferred Font', textAlign: 'center' }}>
        Shared Job Posts
      </Typography>
      {approvedJobs.map(job => (
        <Paper key={job._id} elevation={3} style={{ marginBottom: '16px' }}>
          <Box p={3}>
            <Typography variant="h6" style={{ fontFamily: 'nunito', fontSize: '1.5rem', marginBottom: '16px' }}>
              {job.jobTitle}
            </Typography>
            <Typography variant="body1" style={{ fontFamily: 'Your Preferred Font', fontSize: '1rem' }}>
              <strong>Description:</strong> {job.jobDescription}
              <br />
              <strong>Required Skills:</strong> {job.reqSkills}
              <br />
              <strong>Application Email:</strong> {job.jobApply}
              <br />
              <strong>Salary:</strong> {job.salary}
              <br />
              <strong>Type:</strong> {job.jobType}
              <br />
              <strong>Company Website:</strong> {job.companyWeb}
              <br />
              <strong style={{ color: 'red' }}>Deadline:</strong> {new Date(job.jobDeadline).toLocaleDateString()}
              <br />
              <strong>Created At:</strong> {calculateDaysAgo(job.createdAt)} days ago
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default SharedJobs;

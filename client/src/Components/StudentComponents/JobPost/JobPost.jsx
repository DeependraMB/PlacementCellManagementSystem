import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';
import axios from 'axios';

function JobPost() {
  const [approvedJobs, setApprovedJobs] = useState([]);

  useEffect(() => {
    // Fetch approved jobs when the component mounts
    fetchApprovedJobs();
  }, []); // The empty dependency array ensures the effect runs only once

  const fetchApprovedJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/alumni/get-job');
      // Filter only approved jobs
      const approvedJobs = response.data.jobs.filter(job => job.status === 'Approved');
      setApprovedJobs(approvedJobs);
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
        Approved Job Posts
      </Typography>
      {approvedJobs.map(job => (
        <Paper key={job._id} elevation={3} style={{ marginBottom: '16px' }}>
          <Box p={3}>
            <Typography variant="h6" style={{ fontFamily: 'nunito', fontSize: '1.5rem', marginBottom: '16px' }}>
              {job.jobTitle}
            </Typography>
            <Typography
              component="div"
              variant="body2"
              color="textPrimary"
              style={{ fontFamily: 'Your Preferred Font', textAlign: 'left', fontSize: '1.2rem' }}
            >
              <br />
              
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
              <strong style={{color:"red"}}>Deadline:</strong> {new Date(job.jobDeadline).toLocaleDateString()}
              <br />
              <strong>Created At:</strong> {calculateDaysAgo(job.createdAt)} days ago
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default JobPost;

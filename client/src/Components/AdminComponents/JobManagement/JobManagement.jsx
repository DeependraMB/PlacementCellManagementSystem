import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Paper,
  Box,
} from '@mui/material';
import axios from 'axios';

function JobManagement() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:5000/alumni/get-job')
      .then(response => response.json())
      .then(data => {
        
        setJobs(data.jobs);
      })
      .catch(error => console.error('Error fetching jobs:', error));
  }, []); 

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await axios.post('http://localhost:5000/alumni/update-job-status', { jobId, newStatus });
      
      setJobs(prevJobs =>
        prevJobs.map(job => (job._id === jobId ? { ...job, status: newStatus } : job))
      );
    } catch (error) {
      console.error('Error updating job status:', error);
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
        Job Management
      </Typography>
      {jobs
        .filter(job => job.status !== 'Approved' && job.status !== 'Rejected') // Filter out Approved and Rejected jobs
        .map(job => (
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
                <strong>Deadline:</strong> {new Date(job.jobDeadline).toLocaleDateString()}
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
                <strong>Status:</strong> {job.status}
                <br />
                <strong>Created At:</strong> {calculateDaysAgo(job.createdAt)} days ago
              </Typography>
              <Box mt={2} style={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStatusChange(job._id, 'Approved')}
                  style={{ marginRight: '8px', fontFamily: 'Your Preferred Font', fontSize: '1rem' }}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleStatusChange(job._id, 'Rejected')}
                  style={{ fontFamily: 'Your Preferred Font', fontSize: '1rem' }}
                >
                  Reject
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
    </Box>
  );
}

export default JobManagement;

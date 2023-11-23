// ConductExam.js

import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function ConductExam({ exam }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{exam.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {exam.examDate} | Time: {exam.examTime} | Duration: {exam.duration} minutes
        </Typography>
        {/* You can add more details as needed */}
        <Link to={`/conduct-exam/${exam._id}`}>
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Start Exam
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default ConductExam;

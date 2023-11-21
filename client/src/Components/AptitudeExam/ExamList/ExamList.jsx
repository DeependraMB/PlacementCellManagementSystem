// ExamList.js

import React, { useState, useEffect } from 'react';
import { Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ExamDetails from './ExamDetails';
import { useAuth } from '../../../Context/AuthContext';
function ExamList() {
  const [exams, setExams] = useState([]);
  const { auth, setAuth } = useAuth();
  


  // For demonstration purposes, assuming the teacher's ID is hard-coded. In a real application, you would get this dynamically.
  const teacherEmail = auth.email;

  useEffect(() => {
    // Fetch exams created by the logged-in teacher
    fetch(`http://localhost:5000/exams/exams/${teacherEmail}`)
      .then((response) => response.json())
      .then((data) => setExams(data))
      .catch((error) => console.error('Error fetching exams:', error));
  }, [teacherEmail]); // Re-run the effect when teacherId changes


  console.log(exams);

  return (
    <Container>
      <Link to="/create-exam">
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: '30px',
            paddingLeft: '90px',
            paddingRight: '90px',
            marginRight: '50px',
          }}
        >
          Conduct Exam
        </Button>
      </Link>

      <Grid  spacing={2}>
        {exams.map((exam) => (
          <Grid item xs={12} sm={6} md={4} key={exam.id}>
            <ExamDetails exam={exam} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ExamList;

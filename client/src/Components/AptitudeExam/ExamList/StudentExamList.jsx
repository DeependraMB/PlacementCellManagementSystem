// ExamList.js

import React, { useState, useEffect } from 'react';
import { Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ExamDetails from './ExamDetails';
import { useAuth } from '../../../Context/AuthContext';
function ExamList() {
  const [exams, setExams] = useState([]);
  const { auth, setAuth } = useAuth();
  


  return (
    <Container>
      

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

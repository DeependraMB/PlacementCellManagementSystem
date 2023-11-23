
import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ExamDetails from './ExamDetails';
import { useAuth } from '../../../Context/AuthContext';
import axios from 'axios';
import ConductExam from "../ConductExam/ConductExam"


function ExamList() {
  const [exams, setExams] = useState([]);
  const { auth, setAuth } = useAuth();
  const [studentData, setStudentData] = useState("")
  const [teacherData, setTeacherData] = useState("")

  

  useEffect(() => {
    const studentId = auth._id;
    
    const fetchData = async () => {
      try {
        const userByIdResponse = await axios.get(
          `http://localhost:5000/get-user-byid/get-user-byid/get-user-byid/${studentId}`
        );
        setStudentData(userByIdResponse.data);

        const teacherDetailsResponse = await axios.get(
            `http://localhost:5000/get-teacher/get-teacher/get-teacher/${userByIdResponse.data.departmentId}/${userByIdResponse.data.batch}`
          );
          setTeacherData(teacherDetailsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the fetchData function to start the data fetching process
  }, []);

  useEffect(() => {
    // Fetch exams created by the logged-in teacher
    fetch(`http://localhost:5000/exams/exams/${teacherData.email}`)
      .then((response) => response.json())
      .then((data) => setExams(data))
      .catch((error) => console.error('Error fetching exams:', error));
  }, [teacherData.email]); // Re-run the effect when teacherId changes
  
   console.log(studentData);
   console.log(teacherData);

  return (
    <Container>
      
       <Typography>APTITUDE EXAMS</Typography>
      <Grid  spacing={2} >
        {exams.map((exam) => (
          <Grid item xs={12} sm={6} md={4} key={exam.id}>
            <ConductExam exam={exam} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ExamList;

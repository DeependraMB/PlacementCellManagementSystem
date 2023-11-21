// components/ExamCreationForm.js
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ExamCreationForm = ({ onSubmit }) => {
  const [examDetails, setExamDetails] = useState({
    title: "",
    category: "",
    duration: "",
    examDate: "",
    examTime: "",
    accessCode: "",
    numberOfQuestions: 0,
  });

  console.log(examDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass exam details to the parent component for submission
    onSubmit(examDetails);
  };

  return (
    <Paper
      elevation={2}
      sx={{ padding: "40px 40px 40px 40px", margin: "17px 25px 25px 19px" }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          type="text"
          name="title"
          value={examDetails.title}
          onChange={handleChange}
          fullWidth
          required
          margin="bolder"
        />
        <TextField
          label="Category"
          type="text"
          name="category"
          value={examDetails.category}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Duration (in minutes)"
              type="number"
              name="duration"
              value={examDetails.duration}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Date"
              type="date"
              name="examDate"
              value={examDetails.examDate}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Time"
              type="time"
              name="examTime"
              value={examDetails.examTime}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Access Code"
              type="text"
              name="accessCode"
              value={examDetails.accessCode}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Number of Questions"
              type="number"
              name="numberOfQuestions"
              value={examDetails.numberOfQuestions}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Next: Add Questions
        </Button>
      </Box>
    </Paper>
  );
};

export default ExamCreationForm;

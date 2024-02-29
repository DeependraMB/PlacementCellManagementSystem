import React, { useState } from "react";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackForm = () => {
  const [feedbackData, setFeedbackData] = useState({
    subject: "",
    message: "",
  });
  const { auth } = useAuth();
  const { email, name, role } = auth;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackWithUserData = {
      ...feedbackData,
      email: email,
      author: name,
      role: role
    };

   axios.post("http://localhost:5000/feedback/submit-feedback", feedbackWithUserData).then((res)=>{
    console.log(res);
    toast.success(res.data.message);
   })

    setFeedbackData({
      subject: "",
      message: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        backgroundColor: "#f0ffff",
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 1000 }}>
        <Typography variant="h5" sx={{fontWeight: "bolder", fontFamily: "NUNITO"}}>Feedback Form</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={feedbackData.subject}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message/Feedback"
            name="message"
            value={feedbackData.message}
            onChange={handleChange}
            margin="normal"
          />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Submit Feedback
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default FeedbackForm;

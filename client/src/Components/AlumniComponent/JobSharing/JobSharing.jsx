import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import axios from "axios";

const JobSharingForm = () => {
  const blueBorder = {
    borderBottom: "2px solid #2196F3", 
  };

  const [jobtitle, setJobTitle] = useState("");
  const [jobDeadline, setJobDeadline] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [reqSkills, setReqSkills] = useState("");
  const [jobApply, setJobApply] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [companyWeb, setCompanyWeb] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      jobtitle,
      jobDeadline,
      jobDescription,
      reqSkills,
      jobApply,
      salary,
      jobType,
      companyWeb,
    };
    console.log(formData);
    try {
      const response = await axios.post("your-api-endpoint", formData);
      console.log(response.data);

      setJobTitle("");
      setJobDeadline("");
      setJobDescription("");
      setReqSkills("");
      setJobApply("");
      setSalary("");
      setJobType("");
      setCompanyWeb("");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      component={Box}
      p={3}
      sx={{
        maxWidth: 1250,
        margin: "auto",
        marginTop: "20px",
        marginBottom: "40px",
      }}
    >
      <Typography
        variant="h5"
        mb={3}
        style={{ fontFamily: "nunito", fontWeight: "900" }}
      >
        Share Job Opportunity
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Job Title"
              variant="outlined"
              margin="normal"
              required
              InputProps={{ style: blueBorder }}
              value={jobtitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Application Deadline"
              type="date"
              variant="outlined"
              margin="normal"
              required
              InputProps={{ style: blueBorder }}
              value={jobDeadline}
              onChange={(e) => setJobDeadline(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Job Description"
              variant="outlined"
              margin="normal"
              required
              InputProps={{ style: blueBorder }}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Required Skills"
              variant="outlined"
              margin="normal"
              required
              InputProps={{ style: blueBorder }}
              value={reqSkills}
              onChange={(e) => setReqSkills(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Email or Application Link"
              variant="outlined"
              margin="normal"
              required
              InputProps={{ style: blueBorder }}
              value={jobApply}
              onChange={(e) => setJobApply(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Salary Range"
              variant="outlined"
              margin="normal"
              InputProps={{ style: blueBorder }}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{ style: blueBorder }}
            >
              <InputLabel
                id="employment-type-label"
                InputProps={{ style: blueBorder }}
              >
                Type of Employment
              </InputLabel>
              <Select
                label="Type of Employment"
                labelId="employment-type-label"
                id="employment-type"
                InputProps={{ style: blueBorder }}
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
                <MenuItem value="internship">Internship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Company Website"
              variant="outlined"
              margin="normal"
              InputProps={{ style: blueBorder }}
              value={companyWeb}
              onChange={(e) => setCompanyWeb(e.target.value)}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default JobSharingForm;

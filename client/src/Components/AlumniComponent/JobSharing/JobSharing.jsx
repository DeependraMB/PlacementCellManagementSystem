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
import { useAuth } from "../../../Context/AuthContext";

const JobSharingForm = () => {
  const blueBorder = {
    borderBottom: "2px solid #2196F3",
  };

  const { auth, setAuth } = useAuth();

  const [jobTitle, setJobTitle] = useState("");
  const [jobDeadline, setJobDeadline] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [reqSkills, setReqSkills] = useState("");
  const [jobApply, setJobApply] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [companyWeb, setCompanyWeb] = useState("");

  const [jobTitleError, setJobTitleError] = useState("");
  const [jobDeadlineError, setJobDeadlineError] = useState("");
  const [jobDescriptionError, setJobDescriptionError] = useState("");
  const [reqSkillsError, setReqSkillsError] = useState("");
  const [jobApplyError, setJobApplyError] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [jobTypeError, setJobTypeError] = useState("");
  const [companyWebError, setCompanyWebError] = useState("");

  console.log(jobTitle);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = auth.email;
    const isFormValid = validateForm();

    if (isFormValid) {
      const formData = {
        jobTitle,
        jobDeadline,
        jobDescription,
        reqSkills,
        jobApply,
        salary,
        jobType,
        companyWeb,
        email,
      };

      try {
        console.log(formData);
        const response = await axios.post(
          "http://localhost:5000/alumni/job-share",
          formData
        );

        console.log(response.data);

        // Reset form fields after successful submission
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
    }
  };

  const validateJobTitle = (value) => {
    let isValid = true;

    if (!value) {
      setJobTitleError("Job Title is required");
      isValid = false;
    } else if (value.length < 3) {
      setJobTitleError("Job Title must be at least 3 characters long");
      isValid = false;
    } else {
      setJobTitleError("");
    }

    return isValid;
  };

  const validateJobDeadline = (value) => {
    let isValid = true;

    if (!value) {
      setJobDeadlineError("Application Deadline is required");
      isValid = false;
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(value);

      if (selectedDate < currentDate) {
        setJobDeadlineError("Application Deadline cannot be in the past");
        isValid = false;
      } else {
        setJobDeadlineError("");
      }
    }

    return isValid;
  };

  const validateJobDescription = (value) => {
    let isValid = true;

    if (!value) {
      setJobDescriptionError("Job Description is required");
      isValid = false;
    } else {
      setJobDescriptionError("");
    }

    return isValid;
  };

  const validateReqSkills = (value) => {
    let isValid = true;

    if (!value) {
      setReqSkillsError("Required Skills are required");
      isValid = false;
    } else {
      // Check if the input contains at least one comma
      if (!value.includes(",")) {
        setReqSkillsError("Please enter skills separated by commas");
        isValid = false;
      } else {
        setReqSkillsError("");
      }
    }

    return isValid;
  };

  const validateJobApply = (value) => {
    let isValid = true;

    if (!value) {
      setJobApplyError("Contact Email or Application Link is required");
      isValid = false;
    } else {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Regular expression for URL validation
      // const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

      // Check if the input is a valid email or URL
      if (!emailRegex.test(value)) {
        setJobApplyError("Please enter a valid email or URL");
        isValid = false;
      } else {
        setJobApplyError("");
      }
    }

    return isValid;
  };

  const validateSalary = (value) => {
    let isValid = true;

    // Check if the value is not empty
    if (!value) {
      setSalaryError("Salary is required");
      isValid = false;
    } else {
      // Convert the value to a number
      const numericValue = parseFloat(value);

      // Check if the numeric value is a positive number
      if (isNaN(numericValue) || numericValue <= 0) {
        setSalaryError("Please enter a valid positive salary");
        isValid = false;
      } else {
        setSalaryError("");
      }
    }

    return isValid;
  };

  const validateJobType = (value) => {
    // let isValid = true;

    // if (!value) {
    //   setJobTypeError("Type of Employment is required");
    //   isValid = false;
    // } else {
    //   setJobTypeError("");
    // }

    // return isValid;
  };

  const validateCompanyWeb = (value) => {
    let isValid = true;

    // Add your company website validation logic if needed

    return isValid;
  };

  const validateForm = () => {
    const isJobTitleValid = validateJobTitle(jobTitle);
    const isJobDeadlineValid = validateJobDeadline(jobDeadline);
    const isJobDescriptionValid = validateJobDescription(jobDescription);
    const isReqSkillsValid = validateReqSkills(reqSkills);
    const isJobApplyValid = validateJobApply(jobApply);
    const isSalaryValid = validateSalary(salary);
    const isJobTypeValid = validateJobType(jobType);
    const isCompanyWebValid = validateCompanyWeb(companyWeb);

    return (
      isJobTitleValid &&
      isJobDeadlineValid &&
      isJobDescriptionValid &&
      isReqSkillsValid &&
      isJobApplyValid &&
      isSalaryValid &&
      isJobTypeValid &&
      isCompanyWebValid
    );
  };

  return (
    <Paper
      elevation={3}
      component={Box}
      p={3}
      sx={{
        maxWidth: 1000,
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
              name="jobTitle"
              required
              InputProps={{ style: blueBorder }}
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
                validateJobTitle(e.target.value);
              }}
              error={!!jobTitleError}
              helperText={jobTitleError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Application Deadline"
              type="date"
              variant="outlined"
              margin="normal"
              name="jobDeadline"
              required
              InputProps={{ style: blueBorder }}
              value={jobDeadline}
              onChange={(e) => {
                setJobDeadline(e.target.value);
                validateJobDeadline(e.target.value);
              }}
              error={!!jobDeadlineError}
              helperText={jobDeadlineError}
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
              name="jobDescription"
              required
              InputProps={{ style: blueBorder }}
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                validateJobDescription(e.target.value);
              }}
              error={!!jobDescriptionError}
              helperText={jobDescriptionError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Required Skills"
              variant="outlined"
              margin="normal"
              name="requiredSkills"
              required
              InputProps={{ style: blueBorder }}
              value={reqSkills}
              onChange={(e) => {
                setReqSkills(e.target.value);
                validateReqSkills(e.target.value);
              }}
              error={!!reqSkillsError}
              helperText={reqSkillsError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Email or Application Link"
              variant="outlined"
              margin="normal"
              name="applicationLinkOrEmail"
              required
              InputProps={{ style: blueBorder }}
              value={jobApply}
              onChange={(e) => {
                setJobApply(e.target.value);
                validateJobApply(e.target.value);
              }}
              error={!!jobApplyError}
              helperText={jobApplyError}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Salary Range"
              variant="outlined"
              margin="normal"
              name="salaryRange"
              InputProps={{ style: blueBorder }}
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
                validateSalary(e.target.value);
              }}
              error={!!salaryError}
              helperText={salaryError}
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
                name="jobType"
                InputProps={{ style: blueBorder }}
                value={jobType}
                onChange={(e) => {
                  setJobType(e.target.value);
                  validateJobType(e.target.value);
                }}
                error={!!jobTypeError}
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
              name="companyWebsite"
              InputProps={{ style: blueBorder }}
              value={companyWeb}
              onChange={(e) => {
                setCompanyWeb(e.target.value);
                validateCompanyWeb(e.target.value);
              }}
              error={!!companyWebError}
              helperText={companyWebError}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          name="submitButton"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default JobSharingForm;

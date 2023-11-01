import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const textFieldStyle = {
  borderBottom: "2px solid #1976D2", // Replace with your primary color
};

function SkillsForm({ onNext, onBack }) {
  const { auth, setAuth } = useAuth();
  const [technicalskills, setTechnicalskills] = useState("");
  const [projects, setProjects] = useState("");
  const [githublink, setGithublink] = useState("");
  const [linkedinlink, setLinkedinlink] = useState("");
  const [languagesknown, setLanguagesknown] = useState("");
  const [profilephoto, setProfilephoto] = useState("");
  const [resume, setResume] = useState("");

  const navigate = useNavigate();

  const [technicalskillsError, setTechnicalskillsError] = useState("");
  const [projectsError, setProjectsError] = useState("");
  const [githublinkError, setGithublinkError] = useState("");
  const [linkedinlinkError, setLinkedinlinkError] = useState("");
  const [languagesknownError, setLanguagesknownError] = useState("");
  const [profilephotoError, setProfilephotoError] = useState("");
  const [resumeError, setResumeError] = useState("");

  const [isSkillsFormValid, setIsSkillsFormValid] = useState(false);

  const validateTechnicalSkills = (value) => {
    if (!value) {
      setTechnicalskillsError("Technical Skills is required");
    } else {
      setTechnicalskillsError("");
    }
  };

  const validateProjects = (value) => {
    if (!value) {
      setProjectsError("Projects is required");
    } else {
      setProjectsError("");
    }
  };

  const validateGitHubLink = (value) => {
    if (!value) {
      setGithublinkError("GitHub Link is required");
    } else {
      setGithublinkError("");
    }
  };

  const validateLinkedInLink = (value) => {
    if (!value) {
      setLinkedinlinkError("LinkedIn Link is required");
    } else {
      setLinkedinlinkError("");
    }
  };

  const validateLanguagesKnown = (value) => {
    if (!value) {
      setLanguagesknownError("Languages Known is required");
    } else {
      setLanguagesknownError("");
    }
  };

  const validateProfilePhoto = (value) => {
    if (!value) {
      setProfilephotoError("Profile Photo is required");
    } else {
      setProfilephotoError("");
    }
  };

  const validateResume = (value) => {
    if (!value) {
      setResumeError("Resume is required");
    } else {
      setResumeError("");
    }
  };

  const validateSkillsForm = () => {
    setIsSkillsFormValid(
      !technicalskillsError &&
        !projectsError &&
        !githublinkError &&
        !linkedinlinkError &&
        !languagesknownError &&
        !profilephotoError &&
        !resumeError
    );
  };
  console.log(auth.email);
  const skillsData = {
    email: auth.email,
    technicalskills: technicalskills,
    projects: projects,
    githublink: githublink,
    linkedinlink: linkedinlink,
    languagesknown: languagesknown,
    profilephoto: profilephoto,
    resume: resume,
  };
  console.log(skillsData)

  async function onSkillsSubmit(event) {
    event.preventDefault();
  
    // Validate all form fields
    validateTechnicalSkills(technicalskills);
    validateProjects(projects);
    validateGitHubLink(githublink);
    validateLinkedInLink(linkedinlink);
    validateLanguagesKnown(languagesknown);
    validateProfilePhoto(profilephoto);
    validateResume(resume);

    validateSkillsForm();
  
    // Check if the form is valid
    if (
      !technicalskillsError &&
      !projectsError &&
      !githublinkError &&
      !linkedinlinkError &&
      !languagesknownError &&
      !profilephotoError &&
      !resumeError
    ) {
      try {
        const res = await axios.post(
          "http://localhost:5000/studentdetails/skillsdetails",
          skillsData
        );
        if (res.status === 200) {
          // Successful response
          navigate("/studenthome");
          onNext();
          toast.success(res.data.message);
        } else {
          // Handle other cases (e.g., validation errors from the server)
          console.log("Server response not as expected:", res);
        }
      } catch (error) {
        // Handle network errors
        console.error("Error submitting the form:", error);
      }
    }
  }
  

  return (
    <form
      onSubmit={onSkillsSubmit}
      style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="technicalskills"
            label="Technical Skills"
            style={textFieldStyle}
            fullWidth
            value={technicalskills}
            onChange={(e) => {
              setTechnicalskills(e.target.value);
              validateTechnicalSkills(e.target.value);
            }}
            error={!!technicalskillsError}
            helperText={technicalskillsError}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="projects"
            label="Projects"
            style={textFieldStyle}
            fullWidth
            value={projects}
            onChange={(e) => {
              setProjects(e.target.value);
              validateProjects(e.target.value);
            }}
            error={!!projectsError}
            helperText={projectsError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="githublink"
            label="GitHub Link"
            style={textFieldStyle}
            fullWidth
            value={githublink}
            onChange={(e) => {
              setGithublink(e.target.value);
              validateGitHubLink(e.target.value);
            }}
            error={!!githublinkError}
            helperText={githublinkError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="linkedinlink"
            label="LinkedIn Link"
            style={textFieldStyle}
            fullWidth
            value={linkedinlink}
            onChange={(e) => {
              setLinkedinlink(e.target.value);
              validateLinkedInLink(e.target.value);
            }}
            error={!!linkedinlinkError}
            helperText={linkedinlinkError}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="languagesknown"
            label="Languages Known"
            style={textFieldStyle}
            fullWidth
            value={languagesknown}
            onChange={(e) => {
              setLanguagesknown(e.target.value);
              validateLanguagesKnown(e.target.value);
            }}
            error={!!languagesknownError}
            helperText={languagesknownError}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="profilephoto"
            label="Profile Photo"
            fullWidth
            style={textFieldStyle}
            value={profilephoto}
            onChange={(e) => {
              setProfilephoto(e.target.value);
              validateProfilePhoto(e.target.value);
            }}
            error={!!profilephotoError}
            helperText={profilephotoError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="resume"
            label="Resume"
            fullWidth
            style={textFieldStyle}
            value={resume}
            onChange={(e) => {
              setResume(e.target.value);
              validateResume(e.target.value);
            }}
            error={!!resumeError}
            helperText={resumeError}
          />
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Button
          variant="outlined"
          style={{ paddingLeft: "40px", paddingRight: "40px" }}
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ paddingLeft: "40px", paddingRight: "40px" }}
          onClick={onNext}
          type="submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
}

export default SkillsForm;

{
  /* <Grid item xs={12} sm={6}>
              <TextField
                name="certifications"
                label="Certifications"
                style={textFieldStyle}
                fullWidth
                value={certifications}
                onChange={handleChange}
              />
            </Grid> */
}
{
  /* <Grid item xs={12} sm={6}>
              <TextField
                name="internships"
                label="Internships"
                style={textFieldStyle}
                fullWidth
                value={data.internships}
                onChange={handleChange}
              />
            </Grid> */
}

{
  /* <Grid item xs={12} sm={6}>
              <TextField
                name="achievements"
                label="Details of Achievements"
                style={textFieldStyle}
                fullWidth
                value={data.achievements}
                onChange={handleChange}
              />
            </Grid> */
}

import React, { useState, useEffect } from "react";
import { TextField, Grid, Button } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const textFieldStyle = {
  borderBottom: "2px solid #1976D2", // Replace with your primary color
};
const blueBorder = {
  borderBottom: "2px solid #2196F3", // Replace with your preferred blue color
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
  const [studentData, setStudentData] = useState("");

  const validateTechnicalSkills = (value) => {
    if (!value) {
      setTechnicalskillsError("Technical Skills is required");
    } else {
      setTechnicalskillsError("");
    }
  };

  const maxCharacterLimit = 100; 

  const validateProjects = (value) => {
    if (!value) {
      setProjectsError("Projects is required");
    } else if (value.length > maxCharacterLimit) {
      setProjectsError(`Projects must be ${maxCharacterLimit} characters or less`);
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

  
  useEffect(() => {
    setTechnicalskills(studentData.technicalskills || "");
    setProjects(studentData.projects || "");
    setGithublink(studentData.githublink || "");
    setLinkedinlink(studentData.linkedinlink || "");
    setLanguagesknown(studentData.languagesknown || "");
    setProfilephoto(studentData.profilephoto || "");
    setResume(studentData.resume || "");
  }, [studentData]);

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
  console.log(skillsData);

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
          skillsData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        onNext(skillsData, 'skills');
      } catch (error) {
        // Handle network errors
        console.error("Error submitting the form:", error);
        console.log("Mundalil");
      }
    }
  }

  useEffect(() => {
    const studentEmail = auth.email;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/get-skills-details/get-skills-details/get-skills-details/${studentEmail}`
        );
        console.log(res);
        setStudentData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <form
      style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="technicalskills"
            label="Technical Skills"
            //style={textFieldStyle}
            fullWidth
            value={technicalskills}
            onChange={(e) => {
              setTechnicalskills(e.target.value);
              validateTechnicalSkills(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!technicalskillsError}
            helperText={technicalskillsError}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="projects"
            label="Projects"
            //style={textFieldStyle}
            fullWidth
            value={projects}
            onChange={(e) => {
              setProjects(e.target.value);
              validateProjects(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!projectsError}
            helperText={projectsError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="githublink"
            label="GitHub Link"
            //style={textFieldStyle}
            fullWidth
            value={githublink}
            onChange={(e) => {
              setGithublink(e.target.value);
              validateGitHubLink(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!githublinkError}
            helperText={githublinkError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="linkedinlink"
            label="LinkedIn Link"
            
            fullWidth
            value={linkedinlink}
            onChange={(e) => {
              setLinkedinlink(e.target.value);
              validateLinkedInLink(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!linkedinlinkError}
            helperText={linkedinlinkError}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="languagesknown"
            label="Languages Known"
            
            fullWidth
            value={languagesknown}
            onChange={(e) => {
              setLanguagesknown(e.target.value);
              validateLanguagesKnown(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!languagesknownError}
            helperText={languagesknownError}
          />
        </Grid>

        <Grid item xs={12}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setProfilephoto(e.target.files[0]);
            }}
          />
          {profilephoto && <p>Selected Profile Photo: {profilephoto.name}</p>}
        </Grid>
        <Grid item xs={12}>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              setResume(e.target.files[0]);
            }}
          />
          {resume && <p>Selected Resume: {resume.name}</p>}
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
          onClick={onSkillsSubmit}
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

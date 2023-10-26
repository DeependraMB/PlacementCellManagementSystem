import React from "react";
import { TextField, Grid, Button } from "@mui/material";

const textFieldStyle = {
  borderBottom: "2px solid #1976D2", // Replace with your primary color
};

function SkillsForm({ data, setData, onNext, onBack }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="technicalSkills"
            label="Technical Skills"
            style={textFieldStyle}
            fullWidth
            value={data.technicalSkills}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="certifications"
            label="Certifications"
            style={textFieldStyle}
            fullWidth
            value={data.certifications}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="internships"
            label="Internships"
            style={textFieldStyle}
            fullWidth
            value={data.internships}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="projects"
            label="Projects"
            style={textFieldStyle}
            fullWidth
            value={data.projects}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="githubLink"
            label="GitHub Link"
            style={textFieldStyle}
            fullWidth
            value={data.githubLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="linkedinLink"
            label="LinkedIn Link"
            style={textFieldStyle}
            fullWidth
            value={data.linkedinLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="achievements"
            label="Details of Achievements"
            style={textFieldStyle}
            fullWidth
            value={data.achievements}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="languagesKnown"
            label="Languages Known"
            style={textFieldStyle}
            fullWidth
            value={data.languagesKnown}
            onChange={handleChange}
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
        >
          Next
        </Button>
      </div>
    </form>
  );
}

export default SkillsForm;

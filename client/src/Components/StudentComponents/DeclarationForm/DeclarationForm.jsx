import React from "react";
import { TextField, Grid, Button } from "@mui/material";

const textFieldStyle = {
  borderBottom: "2px solid #1976D2", // Replace with your actual primary color
};

function DeclarationForm({ data, setData, onNext, onBack }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="profilePhoto"
            label="Profile Photo"
            fullWidth
            style={textFieldStyle}
            value={data.profilePhoto}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="resume"
            label="Resume"
            fullWidth
            style={textFieldStyle}
            value={data.resume}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="workLocation"
            label="Preferred Work Location"
            fullWidth
            style={textFieldStyle}
            value={data.workLocation}
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
        {/* <Button
          variant="contained"
          color="primary"
          style={{ paddingLeft: "40px", paddingRight: "40px" }}
          onClick={onNext}
        >
          Next
        </Button> */}
      </div>
    </form>
  );
}

export default DeclarationForm;

import React, { useState } from "react";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import axios from "axios";

const blueBorder = {
  borderBottom: "2px solid #2196F3", // Replace with your preferred blue color
};

function PersonalInfoForm({ data, setData, onNext, onBack }) {
  const { auth, setAuth } = useAuth();
  const [studentData, setStudentData] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const studentId = auth._id;

    axios
      .get(`http://localhost:5000/get-student-byid/${studentId}`)
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <form
      style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          
          <TextField
            name="firstName"
            label="First Name"
            color="primary"
            fullWidth
            value={  data.firstName|| studentData.firstname}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} 
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            value={data.lastName || studentData.lastname}
            onChange={handleChange}
            InputProps={{ style: blueBorder }}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="uniregno"
            label="Uni. Reg. Number"
            fullWidth
            value={data.uniregno || studentData.userId}
            onChange={handleChange}
            InputProps={{ style: blueBorder }}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select name="gender" value={data.gender} onChange={handleChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Add the same InputProps to other text fields */}
        <Grid item xs={12} sm={6}>
          <TextField
            name="phno"
            label="Phone Number"
            fullWidth
            value={data.phno || studentData.phno}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} // Apply the blue border style here
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="dob"
            label="Date of Birth"
            fullWidth
            value={data.dob}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} // Apply the blue border style here
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="personalEmail"
            label="Personal Email ID"
            fullWidth
            value={data.personalEmail}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} // Apply the blue border style here
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="collegeEmail"
            label="College Email ID"
            fullWidth
            value={data.collegeEmail || studentData.email}
            onChange={handleChange}
            InputProps={{ style: blueBorder }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="fatherName"
            label="Father Name"
            fullWidth
            value={data.fatherName}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} // Apply the blue border style here
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="motherName"
            label="Mother Name"
            fullWidth
            value={data.motherName}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} // Apply the blue border style here
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="houseName"
            label="House Name"
            fullWidth
            value={data.houseName}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} // Apply the blue border style here
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="postOffice"
            label="Post Office"
            fullWidth
            value={data.postOffice}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} // Apply the blue border style here
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="city"
            label="City"
            fullWidth
            value={data.city}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} // Apply the blue border style here
          />
        </Grid>
        <Divider />
        <Divider />
        <Grid item xs={12} sm={4}>
          <TextField
            name="state"
            label="State"
            fullWidth
            value={data.state}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} // Apply the blue border style here
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="pincode"
            label="Pincode"
            fullWidth
            value={data.pincode}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} // Apply the blue border style here
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="nationality"
            label="Nationality"
            fullWidth
            value={data.nationality}
            onChange={handleChange}
            InputProps={{ style: blueBorder }} // Apply the blue border style here
          />
        </Grid>
      </Grid>
      <Divider />
      <Divider />
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

export default PersonalInfoForm;

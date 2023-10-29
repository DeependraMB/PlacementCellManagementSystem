import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import axios from "axios";


const textFieldStyle = {
  borderBottom: "2px solid #1976D2", // Replace with your actual primary color
};

function EducationForm({ data, setData, onNext, onBack }) {
  const { auth } = useAuth();
  const [studentData, setStudentData] = useState("");



  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const fetchStudentData = async () => {
    try {
      const studentId = auth._id;
      
      const response = await axios.get(`http://localhost:5000/get-student-byid/${studentId}`);
      const departmentId = response.data.departmentId;
      console.log(response);
      const departmentResponse = await axios.get(`http://localhost:5000/get-department-name/${departmentId}`);
      const departmentName = departmentResponse.data.departmentName;
      setStudentData({ ...response.data, departmentName });
    } catch (error) {
      console.error("Error fetching student data:", error);
      // Additional error handling, such as displaying a user-friendly message.
    }
  };
  

  // Make the data fetching call when the component renders
  fetchStudentData();


  

  return (
    <form
      style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="department"
            label="Department"
            fullWidth
            style={textFieldStyle}
            value={data.department || studentData.departmentName}
            onChange={handleChange}
            id="department"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="batch"
            // label="Batch"
            fullWidth
            style={textFieldStyle}
            value={data.batch || studentData.batch}
            onChange={handleChange}
           id="batch"
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="graduationyear"
            // label="Graduation Year"
            fullWidth
            style={textFieldStyle}
            value={data.graduationyear || studentData.graduationYear}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="tenthPercentage"
            label="10th Percentage"
            fullWidth
            style={textFieldStyle}
            value={data.tenthPercentage}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="tenthCGPA"
            label="10th CGPA"
            fullWidth
            style={textFieldStyle}
            value={data.tenthCGPA}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="tenthBoard"
            label="10th Board"
            fullWidth
            style={textFieldStyle}
            value={data.tenthBoard}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="tenthSchoolName"
            label="10th School Name"
            fullWidth
            style={textFieldStyle}
            value={data.tenthSchoolName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="twelfthPercentage"
            label="12th Percentage"
            fullWidth
            style={textFieldStyle}
            value={data.twelfthPercentage}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="twelfthCGPA"
            label="12th CGPA"
            fullWidth
            style={textFieldStyle}
            value={data.twelfthCGPA}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="twelfthBoard"
            label="12th Board"
            fullWidth
            style={textFieldStyle}
            value={data.twelfthBoard}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="twelfthSchoolName"
            label="12th School Name"
            fullWidth
            style={textFieldStyle}
            value={data.twelfthSchoolName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ugCourseName"
            label="Name of UG Course"
            fullWidth
            style={textFieldStyle}
            value={data.ugCourseName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ugPercentage"
            label="UG Percentage"
            fullWidth
            style={textFieldStyle}
            value={data.ugPercentage}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ugCGPA"
            label="UG CGPA"
            fullWidth
            style={textFieldStyle}
            value={data.ugCGPA}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ugYearOfGraduation"
            label="Year of Graduation (UG)"
            fullWidth
            style={textFieldStyle}
            value={data.ugYearOfGraduation}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="collegeName"
            label="College Name"
            fullWidth
            style={textFieldStyle}
            value={data.collegeName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ugUniversity"
            label="University of UG"
            fullWidth
            style={textFieldStyle}
            value={data.ugUniversity}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="mcaAggregateCGPA"
            label="MCA Aggregate CGPA"
            fullWidth
            style={textFieldStyle}
            value={data.mcaAggregateCGPA}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="activeArrears"
            label="Active Arrears"
            fullWidth
            style={textFieldStyle}
            value={data.activeArrears}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="historyOfArrears"
            label="History of Arrears"
            fullWidth
            style={textFieldStyle}
            value={data.historyOfArrears}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="university"
            label="University"
            fullWidth
            style={textFieldStyle}
            value={data.university}
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

export default EducationForm;

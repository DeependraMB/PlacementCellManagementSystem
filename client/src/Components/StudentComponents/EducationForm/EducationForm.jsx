import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import axios from "axios";

const textFieldStyle = {
  borderBottom: "2px solid #1976D2",
};
const blueBorder = {
  borderBottom: "2px solid #2196F3", // Replace with your preferred blue color
};

function EducationForm({ onNext, onBack }) {
  const { auth } = useAuth();
  const [studentData, setStudentData] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [graduationyear, setGraduationyear] = useState("");
  const [tenthpercentage, setTenthpercentage] = useState("");
  const [tenthCGPA, setTenthCGPA] = useState("");
  const [tenthboard, setTenthboard] = useState("");
  const [tenthschoolname, setTenthschoolname] = useState("");
  const [twelthpercentage, setTwelthpercentage] = useState("");
  const [twelthCGPA, setTwelthCGPA] = useState("");
  const [twelthboard, setTwelthboard] = useState("");
  const [twelthschoolname, setTwelthschoolname] = useState("");
  const [ugcoursename, setUgcoursename] = useState("");
  const [ugpercentage, setUgpercentage] = useState("");
  const [ugCGPA, setUgCGPA] = useState("");
  const [ugyearofgraduation, setUgyearofgraduation] = useState("");
  const [ugcollegename, setUgCollegename] = useState("");
  const [uguniversity, setUguniversity] = useState("");
  const [mcaaggregateCGPA, setMcaaggregateCGPA] = useState("");
  const [activearrears, setActivearrears] = useState("");
  const [historyofarrears, setHistoryofarrears] = useState("");
  const [university, setUniversity] = useState("");

  const [departmentError, setDepartmentError] = useState("");
  const [batchError, setBatchError] = useState("");
  const [graduationyearError, setGraduationyearError] = useState("");
  const [tenthpercentageError, setTenthpercentageError] = useState("");
  const [tenthCGPAError, setTenthCGPAError] = useState("");
  const [tenthboardError, setTenthboardError] = useState("");
  const [tenthschoolnameError, setTenthschoolnameError] = useState("");
  const [twelthpercentageError, setTwelthpercentageError] = useState("");
  const [twelthCGPAError, setTwelthCGPAError] = useState("");
  const [twelthboardError, setTwelthboardError] = useState("");
  const [twelthschoolnameError, setTwelthschoolnameError] = useState("");
  const [ugcoursenameError, setUgcoursenameError] = useState("");
  const [ugpercentageError, setUgpercentageError] = useState("");
  const [ugCGPAError, setUgCGPAError] = useState("");
  const [ugyearofgraduationError, setUgyearofgraduationError] = useState("");
  const [ugcollegenameError, setUgCollegenameError] = useState("");
  const [uguniversityError, setUguniversityError] = useState("");
  const [mcaaggregateCGPAError, setMcaaggregateCGPAError] = useState("");
  const [activearrearsError, setActivearrearsError] = useState("");
  const [historyofarrearsError, setHistoryofarrearsError] = useState("");
  const [universityError, setUniversityError] = useState("");

  const [isEducationFormValid, setIsEducationFormValid] = useState(false);
  const [program, setProgram] = useState("BTECH");

  const validateDepartment = (value) => {
    if (!value) {
      setDepartmentError("Department is required");
    } else {
      setDepartmentError("");
    }
  };
  const validateBatch = (value) => {
    if (!value) {
      setBatchError("Batch is required");
    } else {
      // If the value is valid, clear the error state
      setBatchError("");
    }
  };

  const validateGraduationYear = (value) => {
    if (!value) {
      setGraduationyearError("Graduation Year is required");
    } else {
      setGraduationyearError("");
    }
  };

  const validateTenthPercentage = (value) => {
    if (!value) {
      setTenthpercentageError("10th Percentage is required");
    } else if (isNaN(value) || /\s/.test(value)) {
      setTenthpercentageError("10th Percentage must be a number without spaces");
    } else {
      const percentageValue = parseFloat(value);
      
      if (percentageValue < 0 || percentageValue > 100) {
        setTenthpercentageError("10th Percentage must be between 0 and 100");
      } else {
        setTenthpercentageError("");
      }
    }
  };
  
  
  

  const validateTenthCGPA = (value) => {
    if (!value) {
      setTenthCGPAError("10th CGPA is required");
    } else {
      const cgpaValue = parseFloat(value);
  
      if (isNaN(cgpaValue)) {
        setTenthCGPAError("10th CGPA must be a number");
      } else if (cgpaValue < 0 || cgpaValue > 10) {
        setTenthCGPAError("10th CGPA must be between 0 and 10");
      } else {
        setTenthCGPAError("");
      }
    }
  };
  

  const validateTenthBoard = (value) => {
    if (!value) {
      setTenthboardError("10th Board is required");
    } else if (/[^A-Za-z\s]/.test(value)) {
      setTenthboardError("10th Board should not contain special characters or numbers");
    } else {
      setTenthboardError("");
    }
  };
  

  const validateTenthSchoolName = (value) => {
    if (!value) {
      setTenthschoolnameError("10th School Name is required");
    } else if (/\d/.test(value)) {
      setTenthschoolnameError("10th School Name should not contain numbers");
    } else {
      setTenthschoolnameError("");
    }
  };
  

  const validateTwelthPercentage = (value) => {
    if (!value) {
      setTwelthpercentageError("12th Percentage is required");
    } else if (isNaN(value) || /\s/.test(value)) {
      setTwelthpercentageError("12th Percentage must be a number without spaces");
    } else {
      const percentageValue = parseFloat(value);
      
      if (percentageValue < 0 || percentageValue > 100) {
        setTwelthpercentageError("12th Percentage must be between 0 and 100");
      } else {
        setTwelthpercentageError("");
      }
    }
  };
  
  

  const validateTwelthCGPA = (value) => {
    if (!value) {
      setTwelthCGPAError("12th CGPA is required");
    } else {
      const cgpaValue = parseFloat(value);
  
      if (isNaN(cgpaValue)) {
        setTwelthCGPAError("12th CGPA must be a number");
      } else if (cgpaValue < 0 || cgpaValue > 10) {
        setTwelthCGPAError("12th CGPA must be between 0 and 10");
      } else {
        setTwelthCGPAError("");
      }
    }
  };
  

  const validateTwelthBoard = (value) => {
    if (!value) {
      setTwelthboardError("12th Board is required");
    } else if (/[^A-Za-z\s]/.test(value)) {
      setTwelthboardError("12th Board should not contain special characters or numbers");
    } else {
      setTwelthboardError("");
    }
  };
  
  const validateTwelthSchoolName = (value) => {
    if (!value) {
      setTwelthschoolnameError("12th School Name is required");
    } else if (/[^A-Za-z\s]/.test(value)) {
      setTwelthschoolnameError("12th School Name should not contain special characters or numbers");
    } else {
      setTwelthschoolnameError("");
    }
  };
  

  const validateUgCourseName = (value) => {
    if (!value) {
      setUgcoursenameError("Name of UG Course is required");
    } else if (/[^A-Za-z\s]/.test(value)) {
      setUgcoursenameError("Name of UG Course should not contain special characters or numbers");
    } else {
      setUgcoursenameError("");
    }
  };
  

  const validateUgPercentage = (value) => {
    if (!value) {
      setUgpercentageError("UG Percentage is required");
    } else if (isNaN(value) || /\s/.test(value)) {
      setUgpercentageError("UG Percentage must be a number without spaces");
    } else {
      const percentageValue = parseFloat(value);
      
      if (percentageValue < 0 || percentageValue > 100) {
        setUgpercentageError("UG Percentage must be between 0 and 100");
      } else {
        setUgpercentageError("");
      }
    }
  };
  
  
  const validateUgCGPA = (value) => {
    if (!value) {
      setUgCGPAError("UG CGPA is required");
    } else {
      const cgpaValue = parseFloat(value);
  
      if (isNaN(cgpaValue)) {
        setUgCGPAError("UG CGPA must be a number");
      } else if (cgpaValue < 0 || cgpaValue > 10) {
        setUgCGPAError("UG CGPA must be between 0 and 10");
      } else {
        setUgCGPAError("");
      }
    }
  };
  

  const validateUgYearOfGraduation = (value) => {
    if (!value) {
      setUgyearofgraduationError("Year of Graduation (UG) is required");
    } else if (!/^\d+$/.test(value)) {
      setUgyearofgraduationError("Year of Graduation (UG) should contain only numbers");
    } else {
      setUgyearofgraduationError("");
    }
  };
  

  const validateUgCollegeName = (value) => {
    if (!value) {
      setUgCollegenameError("College Name is required");
    } else if (/[^A-Za-z\s]/.test(value)) {
      setUgCollegenameError("College Name should not contain special characters or numbers");
    } else {
      setUgCollegenameError("");
    }
  };
  
  const validateUgUniversity = (value) => {
    if (!value) {
      setUguniversityError("University of UG is required");
    } else if (/[^A-Za-z\s]/.test(value)) {
      setUguniversityError("University of UG should not contain special characters or numbers");
    } else {
      setUguniversityError("");
    }
  };
  

  const validateMcaAggregateCGPA = (value) => {
    if (!value) {
      setMcaaggregateCGPAError("MCA Aggregate CGPA is required");
    } else {
      const cgpaValue = parseFloat(value);
  
      if (isNaN(cgpaValue)) {
        setMcaaggregateCGPAError("MCA Aggregate CGPA must be a number");
      } else if (cgpaValue < 0 || cgpaValue > 10) {
        setMcaaggregateCGPAError("MCA Aggregate CGPA must be between 0 and 10");
      } else {
        setMcaaggregateCGPAError("");
      }
    }
  };
  
  const validateActiveArrears = (value) => {
    if (!value) {
      setActivearrearsError("Active Arrears is required");
    } else if (!/^\d+$/.test(value)) {
      setActivearrearsError("Active Arrears should contain only whole numbers (integers)");
    } else {
      setActivearrearsError("");
    }
  };
  

  const validateHistoryOfArrears = (value) => {
    if (!value) {
      setHistoryofarrearsError("History of Arrears is required");
    } else if (!/^\d+$/.test(value)) {
      setHistoryofarrearsError("History of Arrears should contain only whole numbers (integers)");
    } else {
      setHistoryofarrearsError("");
    }
  };
  

  const validateUniversity = (value) => {
    if (!value) {
      setUniversityError("University is required");
    } else if (/[^A-Za-z\s]/.test(value)) {
      setUniversityError("University should not contain special characters or numbers");
    } else {
      setUniversityError("");
    }
  };
  

  console.log(studentData);
  const validateEducationForm = () => {
    setIsEducationFormValid(
      !departmentError &&
        !batchError &&
        !graduationyearError &&
        !tenthpercentageError &&
        !tenthCGPAError &&
        !tenthboardError &&
        !tenthschoolnameError &&
        !twelthpercentageError &&
        !twelthCGPAError &&
        !twelthboardError &&
        !twelthschoolnameError &&
        !ugcoursenameError &&
        !ugpercentageError &&
        !ugCGPAError &&
        !ugyearofgraduationError &&
        !ugcollegenameError &&
        !uguniversityError &&
        !mcaaggregateCGPAError &&
        !activearrearsError &&
        !historyofarrearsError &&
        !universityError
    );
  };

  useEffect(() => {
    setDepartment(studentData.departmentName || "");
    setBatch(studentData.batch || "");
    setGraduationyear(studentData.graduationYear || "");
    setTenthpercentage(studentData.tenthpercentage || "");
    setTenthCGPA(studentData.tenthCGPA || "");
    setTenthboard(studentData.tenthboard || "");
    setTenthschoolname(studentData.tenthschoolname || "");
    setTwelthpercentage(studentData.twelthpercentage || "");
    setTwelthCGPA(studentData.twelthCGPA || "");
    setTwelthboard(studentData.twelthboard || "");
    setTwelthschoolname(studentData.twelthschoolname || "");
    setUgcoursename(studentData.ugcoursename || "");
    setUgpercentage(studentData.ugpercentage || "");
    setUgCGPA(studentData.ugCGPA || "");
    setUgyearofgraduation(studentData.ugyearofgraduation || "");
    setUgCollegename(studentData.ugcollegename || "");
    setUguniversity(studentData.uguniversity || "");
    setMcaaggregateCGPA(studentData.mcaaggregateCGPA || "");
    setActivearrears(studentData.activearrears || "");
    setHistoryofarrears(studentData.historyofarrears || "");
    setUniversity(studentData.university || "");
  }, [studentData]);

  
  
  
  const educationData = {
    program : program,
    email: auth.email,
    tenthpercentage: tenthpercentage,
    tenthCGPA: tenthCGPA,
    tenthboard: tenthboard,
    tenthschoolname: tenthschoolname,
    twelthpercentage: twelthpercentage,
    twelthCGPA: twelthCGPA,
    twelthboard: twelthboard,
    twelthschoolname: twelthschoolname,
    ugpercentage: ugpercentage,
    ugCGPA: ugCGPA,
    uguniversity: uguniversity,
    activearrears: activearrears,
    historyofarrears: historyofarrears,
    ugyearofgraduation: ugyearofgraduation,
    ugcoursename: ugcoursename,
    ugcollegename: ugcollegename,
    mcaaggregateCGPA: mcaaggregateCGPA,  
    university: university,
  };
  console.log(educationData);

  async function onEducationSubmit(event) {
    event.preventDefault();

    validateDepartment(department);
    validateBatch(batch);
    validateGraduationYear(graduationyear);
    validateTenthPercentage(tenthpercentage);
    validateTenthCGPA(tenthCGPA);
    validateTenthBoard(tenthboard);
    validateTenthSchoolName(tenthschoolname);
    validateTwelthPercentage(twelthpercentage);
    validateTwelthCGPA(twelthCGPA);
    validateTwelthBoard(twelthboard);
    validateTwelthSchoolName(twelthschoolname);
    validateUgCourseName(ugcoursename);
    validateUgPercentage(ugpercentage);
    validateUgCGPA(ugCGPA);
    validateUgYearOfGraduation(ugyearofgraduation);
    validateUgCollegeName(ugcollegename);
    validateUgUniversity(uguniversity);
    validateMcaAggregateCGPA(mcaaggregateCGPA);
    validateActiveArrears(activearrears);
    validateHistoryOfArrears(historyofarrears);
    validateUniversity(university);

    validateEducationForm();

    if (isEducationFormValid) {
      try {
        const res = await axios.post(
          "http://localhost:5000/studentdetails/educationdetails",
          educationData
        );
        onNext(educationData, 'education');
      } catch (error) {
        console.log(error);
      }
    }
  }
  const fetchStudentData = async () => {
    try {
      const studentEmail = auth.email;
      const studentId = auth._id;
      console.log(studentId);
  
      // Fetch student data
      const response = await axios.get(
        `http://localhost:5000/get-user-byid/get-user-byid/get-user-byid/${studentId}`
      );
      console.log(response);
      const departmentId = response.data.departmentId;
      console.log(departmentId);
  
      // Fetch department name
      const departmentResponse = await axios.get(
        `http://localhost:5000/get-department-name/get-department-name/get-department-name/${departmentId}`
      );
      const departmentName = departmentResponse.data.departmentName;
      console.log(departmentName);
  
      // Fetch education details
      const educationResponse = await axios.get(
        `http://localhost:5000/get-education-details/get-education-details/get-education-details/${studentEmail}`
      );
  
      console.log(educationResponse);
  
      // Update the state with the retrieved data
      setStudentData({
        ...response.data,
        departmentName,
        ...educationResponse.data, // Assuming educationDetails is the key for education data
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  
  // Call the fetchStudentData function inside a useEffect to ensure it's called after the component is mounted.
  useEffect(() => {
    fetchStudentData();
  }, []); // The empty dependency array ensures that this effect runs once after the component is mounted.
  
  console.log(studentData);

  return (
    <form
      onSubmit={onEducationSubmit}
      style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Program</FormLabel>
            <RadioGroup
              row
              name="program"
              value={program}
              onChange={(e) => {
                setProgram(e.target.value);
              }}
            >
              <FormControlLabel
                value="BTECH"
                control={<Radio />}
                label="B.Tech"
              />
              <FormControlLabel value="MCA" control={<Radio />} label="MCA" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {program === "BTECH" && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                name="tenthpercentage"
                label="10th Percentage"
                fullWidth
                value={tenthpercentage }
                onChange={(e) => {
                  setTenthpercentage(e.target.value);
                  validateTenthPercentage(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!tenthpercentageError}
                helperText={tenthpercentageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="tenthCGPA"
                label="10th CGPA"
                fullWidth
                value={tenthCGPA}
                onChange={(e) => {
                  setTenthCGPA(e.target.value);
                  validateTenthCGPA(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!tenthCGPAError}
                helperText={tenthCGPAError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="tenthboard"
                label="10th Board"
                fullWidth
                value={tenthboard}
                onChange={(e) => {
                  setTenthboard(e.target.value);
                  validateTenthBoard(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!tenthboardError}
                helperText={tenthboardError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="tenthschoolname"
                label="10th School Name"
                fullWidth
                value={tenthschoolname}
                onChange={(e) => {
                  setTenthschoolname(e.target.value);
                  validateTenthSchoolName(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!tenthschoolnameError}
                helperText={tenthschoolnameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="twelthpercentage"
                label="12th Percentage"
                fullWidth
                value={twelthpercentage}
                onChange={(e) => {
                  setTwelthpercentage(e.target.value);
                  validateTwelthPercentage(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!twelthpercentageError}
                helperText={twelthpercentageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="twelthCGPA"
                label="12th CGPA"
                fullWidth
                value={twelthCGPA}
                onChange={(e) => {
                  setTwelthCGPA(e.target.value);
                  validateTwelthCGPA(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!twelthCGPAError}
                helperText={twelthCGPAError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="twelthboard"
                label="12th Board"
                fullWidth
                value={twelthboard}
                onChange={(e) => {
                  setTwelthboard(e.target.value);
                  validateTwelthBoard(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!twelthboardError}
                helperText={twelthboardError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="twelthschoolname"
                label="12th School Name"
                fullWidth
                value={twelthschoolname}
                onChange={(e) => {
                  setTwelthschoolname(e.target.value);
                  validateTenthSchoolName(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!twelthschoolnameError}
                helperText={twelthschoolnameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="department"
                label="Department"
                fullWidth
                value={department || studentData.department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  validateDepartment(e.target.value);
                }}
                id="department"
                autoFocus
                InputProps={{ style: blueBorder }}
                error={!!departmentError}
                helperText={departmentError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="batch"
                label="Batch"
                fullWidth
                value={batch}
                onChange={(e) => {
                  setBatch(e.target.value);
                  validateBatch(e.target.value);
                }}
                id="batch"
                InputProps={{ style: blueBorder }}
                error={!!batchError}
                helperText={batchError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="graduationyear"
                label="Graduation Year"
                fullWidth
                value={graduationyear}
                onChange={(e) => {
                  setGraduationyear(e.target.value);
                  validateGraduationYear(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!graduationyearError}
                helperText={graduationyearError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="uguniversity"
                label="University of UG"
                fullWidth
                value={uguniversity}
                onChange={(e) => {
                  setUguniversity(e.target.value);
                  validateUgUniversity(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!uguniversityError}
                helperText={uguniversityError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="ugpercentage"
                label="UG Percentage"
                fullWidth
                value={ugpercentage}
                onChange={(e) => {
                  setUgpercentage(e.target.value);
                  validateUgPercentage(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!ugpercentageError}
                helperText={ugpercentageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="ugCGPA"
                label="UG CGPA"
                fullWidth
                value={ugCGPA}
                onChange={(e) => {
                  setUgCGPA(e.target.value);
                  validateUgCGPA(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!ugCGPAError}
                helperText={ugCGPAError}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="activearrears"
                label="Active Arrears"
                fullWidth
                value={activearrears}
                onChange={(e) => {
                  setActivearrears(e.target.value);
                  validateActiveArrears(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!activearrearsError}
                helperText={activearrearsError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="historyofarrears"
                label="History of Arrears"
                fullWidth
                value={historyofarrears}
                onChange={(e) => {
                  setHistoryofarrears(e.target.value);
                  validateHistoryOfArrears(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!historyofarrearsError}
                helperText={historyofarrearsError}
              />
            </Grid>
          </>
        )}

        {program === "MCA" && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                name="tenthpercentage"
                label="10th Percentage"
                fullWidth
                value={tenthpercentage || studentData.tenthpercentage}
                onChange={(e) => {
                  setTenthpercentage(e.target.value);
                  validateTenthPercentage(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!tenthpercentageError}
                helperText={tenthpercentageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="tenthCGPA"
                label="10th CGPA"
                fullWidth
                value={tenthCGPA}
                onChange={(e) => {
                  setTenthCGPA(e.target.value);
                  validateTenthCGPA(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!tenthCGPAError}
                helperText={tenthCGPAError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="tenthboard"
                label="10th Board"
                fullWidth
                value={tenthboard}
                onChange={(e) => {
                  setTenthboard(e.target.value);
                  validateTenthBoard(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!tenthboardError}
                helperText={tenthboardError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="tenthschoolname"
                label="10th School Name"
                fullWidth
                value={tenthschoolname}
                onChange={(e) => {
                  setTenthschoolname(e.target.value);
                  validateTenthSchoolName(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!tenthschoolnameError}
                helperText={tenthschoolnameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="twelthpercentage"
                label="12th Percentage"
                fullWidth
                value={twelthpercentage}
                onChange={(e) => {
                  setTwelthpercentage(e.target.value);
                  validateTwelthPercentage(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!twelthpercentageError}
                helperText={twelthpercentageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="twelthCGPA"
                label="12th CGPA"
                fullWidth
                value={twelthCGPA}
                onChange={(e) => {
                  setTwelthCGPA(e.target.value);
                  validateTwelthCGPA(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!twelthCGPAError}
                helperText={twelthCGPAError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="twelthboard"
                label="12th Board"
                fullWidth
                value={twelthboard}
                onChange={(e) => {
                  setTwelthboard(e.target.value);
                  validateTwelthBoard(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!twelthboardError}
                helperText={twelthboardError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="twelthschoolname"
                label="12th School Name"
                fullWidth
                value={twelthschoolname}
                onChange={(e) => {
                  setTwelthschoolname(e.target.value);
                  validateTenthSchoolName(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!twelthschoolnameError}
                helperText={twelthschoolnameError}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="ugcoursename"
                label="Name of UG Course"
                fullWidth
                value={ugcoursename}
                onChange={(e) => {
                  setUgcoursename(e.target.value);
                  validateUgCourseName(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!ugcoursenameError}
                helperText={ugcoursenameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="ugyearofgraduation"
                label="Year of Graduation (UG)"
                fullWidth
                value={ugyearofgraduation}
                onChange={(e) => {
                  setUgyearofgraduation(e.target.value);
                  validateUgYearOfGraduation(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!ugyearofgraduationError}
                helperText={ugyearofgraduationError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="ugpercentage"
                label="UG Percentage"
                fullWidth
                value={ugpercentage}
                onChange={(e) => {
                  setUgpercentage(e.target.value);
                  validateUgPercentage(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!ugpercentageError}
                helperText={ugpercentageError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="ugCGPA"
                label="UG CGPA"
                fullWidth
                value={ugCGPA}
                onChange={(e) => {
                  setUgCGPA(e.target.value);
                  validateUgCGPA(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!ugCGPAError}
                helperText={ugCGPAError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="ugcollegename"
                label="College Name"
                fullWidth
                value={ugcollegename}
                onChange={(e) => {
                  setUgCollegename(e.target.value);
                  validateUgCollegeName(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!ugcollegenameError}
                helperText={ugcollegenameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="uguniversity"
                label="University of UG"
                fullWidth
                value={uguniversity}
                onChange={(e) => {
                  setUguniversity(e.target.value);
                  validateUgUniversity(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!uguniversityError}
                helperText={uguniversityError}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="department"
                label="Department"
                fullWidth
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  validateDepartment(e.target.value);
                }}
                id="department"
                autoFocus
                InputProps={{ style: blueBorder }}
                error={!!departmentError}
                helperText={departmentError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="batch"
                label="Batch"
                fullWidth
                value={batch || studentData.batch}
                onChange={(e) => {
                  setBatch(e.target.value);
                  validateBatch(e.target.value);
                }}
                id="batch"
                InputProps={{ style: blueBorder }}
                error={!!batchError}
                helperText={batchError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="graduationyear"
                label="Graduation Year"
                fullWidth
                value={graduationyear || studentData.graduationYear}
                onChange={(e) => {
                  setGraduationyear(e.target.value);
                  validateGraduationYear(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!graduationyearError}
                helperText={graduationyearError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="mcaaggregateCGPA"
                label="MCA Aggregate CGPA"
                fullWidth
                value={mcaaggregateCGPA}
                onChange={(e) => {
                  setMcaaggregateCGPA(e.target.value);
                  validateMcaAggregateCGPA(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!mcaaggregateCGPAError}
                helperText={mcaaggregateCGPAError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="activearrears"
                label="Active Arrears"
                fullWidth
                value={activearrears}
                onChange={(e) => {
                  setActivearrears(e.target.value);
                  validateActiveArrears(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!activearrearsError}
                helperText={activearrearsError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="historyofarrears"
                label="History of Arrears"
                fullWidth
                value={historyofarrears}
                onChange={(e) => {
                  setHistoryofarrears(e.target.value);
                  validateHistoryOfArrears(e.target.value);
                }}
                InputProps={{ style: blueBorder }}
                error={!!historyofarrearsError}
                helperText={historyofarrearsError}
              />
            </Grid>
          </>
        )}
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
          type="submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
}

export default EducationForm;

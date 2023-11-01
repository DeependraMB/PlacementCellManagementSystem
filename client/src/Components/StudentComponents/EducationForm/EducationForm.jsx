import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import axios from "axios";

const textFieldStyle = {
  borderBottom: "2px solid #1976D2",

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
  const [collegename, setCollegename] = useState("");
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
  const [collegenameError, setCollegenameError] = useState("");
  const [uguniversityError, setUguniversityError] = useState("");
  const [mcaaggregateCGPAError, setMcaaggregateCGPAError] = useState("");
  const [activearrearsError, setActivearrearsError] = useState("");
  const [historyofarrearsError, setHistoryofarrearsError] = useState("");
  const [universityError, setUniversityError] = useState("");

  const [isEducationFormValid, setIsEducationFormValid] = useState(false);

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
    } else {
      setTenthpercentageError("");
    }
  };

  const validateTenthCGPA = (value) => {
    if (!value) {
      setTenthCGPAError("10th CGPA is required");
    } else {
      setTenthCGPAError("");
    }
  };

  const validateTenthBoard = (value) => {
    if (!value) {
      setTenthboardError("10th Board is required");
    } else {
      setTenthboardError("");
    }
  };

  const validateTenthSchoolName = (value) => {
    if (!value) {
      setTenthschoolnameError("10th School Name is required");
    } else {
      setTenthschoolnameError("");
    }
  };

  const validateTwelthPercentage = (value) => {
    if (!value) {
      setTwelthpercentageError("12th Percentage is required");
    } else {
      setTwelthpercentageError("");
    }
  };

  const validateTwelthCGPA = (value) => {
    if (!value) {
      setTwelthCGPAError("12th CGPA is required");
    } else {
      setTwelthCGPAError("");
    }
  };

  const validateTwelthBoard = (value) => {
    if (!value) {
      setTwelthboardError("12th Board is required");
    } else {
      setTwelthboardError("");
    }
  };

  const validateTwelthSchoolName = (value) => {
    if (!value) {
      setTwelthschoolnameError("12th School Name is required");
    } else {
      setTwelthschoolnameError("");
    }
  };

  const validateUgCourseName = (value) => {
    if (!value) {
      setUgcoursenameError("Name of UG Course is required");
    } else {
      setUgcoursenameError("");
    }
  };

  const validateUgPercentage = (value) => {
    if (!value) {
      setUgpercentageError("UG Percentage is required");
    } else {
      setUgpercentageError("");
    }
  };

  const validateUgCGPA = (value) => {
    if (!value) {
      setUgCGPAError("UG CGPA is required");
    } else {
      setUgCGPAError("");
    }
  };

  const validateUgYearOfGraduation = (value) => {
    if (!value) {
      setUgyearofgraduationError("Year of Graduation (UG) is required");
    } else {
      setUgyearofgraduationError("");
    }
  };

  const validateCollegeName = (value) => {
    if (!value) {
      setCollegenameError("College Name is required");
    } else {
      setCollegenameError("");
    }
  };

  const validateUgUniversity = (value) => {
    if (!value) {
      setUguniversityError("University of UG is required");
    } else {
      setUguniversityError("");
    }
  };

  const validateMcaAggregateCGPA = (value) => {
    if (!value) {
      setMcaaggregateCGPAError("MCA Aggregate CGPA is required");
    } else {
      setMcaaggregateCGPAError("");
    }
  };

  const validateActiveArrears = (value) => {
    if (!value) {
      setActivearrearsError("Active Arrears is required");
    } else {
      setActivearrearsError("");
    }
  };

  const validateHistoryOfArrears = (value) => {
    if (!value) {
      setHistoryofarrearsError("History of Arrears is required");
    } else {
      setHistoryofarrearsError("");
    }
  };

  const validateUniversity = (value) => {
    if (!value) {
      setUniversityError("University is required");
    } else {
      setUniversityError("");
    }
  };

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
        !collegenameError &&
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
  }, [
    studentData.departmentName,
    studentData.batch,
    studentData.graduationYear,
  ]);

  const educationData = {
    email: studentData.email,
    tenthpercentage: tenthpercentage,
    tenthCGPA: tenthCGPA,
    tenthboard: tenthboard,
    tenthschoolname: tenthschoolname,
    twelthpercentage: twelthpercentage,
    twelthCGPA: twelthCGPA,
    twelthboard: twelthboard,
    twelthschoolname: twelthschoolname,
    ugcoursename: ugcoursename,
    ugpercentage: ugpercentage,
    ugCGPA: ugCGPA,
    ugyearofgraduation: ugyearofgraduation,
    collegename: collegename,
    uguniversity: uguniversity,
    mcaaggregateCGPA: mcaaggregateCGPA,
    activearrears: activearrears,
    historyofarrears: historyofarrears,
    university: university,
  };



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
    validateCollegeName(collegename);
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
        onNext();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const fetchStudentData = async () => {
    try {
      const studentId = auth._id;
      console.log(studentId);
      const response = await axios.get(
        `http://localhost:5000/get-user-byid/${studentId}`
      );
      console.log(response);
      const departmentId = response.data.departmentId;

      const departmentResponse = await axios.get(
        `http://localhost:5000/get-department-name/${departmentId}`
      );
      const departmentName = departmentResponse.data.departmentName;
      setStudentData({ ...response.data, departmentName });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  fetchStudentData();

  return (
    <form
      onSubmit={onEducationSubmit}
      style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}
    >
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="department"
            label="Department"
            fullWidth
            
            value={department || studentData.departmentName}
            onChange={(e) => {
              setDepartment(e.target.value);
              validateDepartment(e.target.value);
            }}
            id="department"
            autoFocus
            error={!!departmentError}
            helperText={departmentError}
            style={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="batch"
            // label="Batch"
            fullWidth
            style={textFieldStyle}
            value={batch || studentData.batch}
            onChange={(e) => {
              setBatch(e.target.value);
              validateBatch(e.target.value);
            }}
            id="batch"
            error={!!batchError}
            helperText={batchError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="graduationyear"
            // label="Graduation Year"
            fullWidth
            style={textFieldStyle}
            value={graduationyear || studentData.graduationYear}
            onChange={(e) => {
              setGraduationyear(e.target.value);
              validateGraduationYear(e.target.value);
            }}
            error={!!graduationyearError}
            helperText={graduationyearError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="tenthpercentage"
            label="10th Percentage"
            fullWidth
            style={textFieldStyle}
            value={tenthpercentage}
            onChange={(e) => {
              setTenthpercentage(e.target.value);
              validateTenthPercentage(e.target.value);
            }}
            error={!!tenthpercentageError}
            helperText={tenthpercentageError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="tenthCGPA"
            label="10th CGPA"
            fullWidth
            style={textFieldStyle}
            value={tenthCGPA}
            onChange={(e) => {
              setTenthCGPA(e.target.value);
              validateTenthCGPA(e.target.value);
            }}
            error={!!tenthCGPAError}
            helperText={tenthCGPAError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="tenthboard"
            label="10th Board"
            fullWidth
            style={textFieldStyle}
            value={tenthboard}
            onChange={(e) => {
              setTenthboard(e.target.value);
              validateTenthBoard(e.target.value);
            }}
            error={!!tenthboardError}
            helperText={tenthboardError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="tenthschoolname"
            label="10th School Name"
            fullWidth
            style={textFieldStyle}
            value={tenthschoolname}
            onChange={(e) => {
              setTenthschoolname(e.target.value);
              validateTenthSchoolName(e.target.value);
            }}
            error={!!tenthschoolnameError}
            helperText={tenthschoolnameError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="twelthpercentage"
            label="12th Percentage"
            fullWidth
            style={textFieldStyle}
            value={twelthpercentage}
            onChange={(e) => {
              setTwelthpercentage(e.target.value);
              validateTwelthPercentage(e.target.value);
            }}
            error={!!twelthpercentageError}
            helperText={twelthpercentageError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="twelthCGPA"
            label="12th CGPA"
            fullWidth
            style={textFieldStyle}
            value={twelthCGPA}
            onChange={(e) => {
              setTwelthCGPA(e.target.value);
              validateTwelthCGPA(e.target.value);
            }}
            error={!!twelthCGPAError}
            helperText={twelthCGPAError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="twelthboard"
            label="12th Board"
            fullWidth
            style={textFieldStyle}
            value={twelthboard}
            onChange={(e) => {
              setTwelthboard(e.target.value);
              validateTwelthBoard(e.target.value);
            }}
            error={!!twelthboardError}
            helperText={twelthboardError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="twelthschoolname"
            label="12th School Name"
            fullWidth
            style={textFieldStyle}
            value={twelthschoolname}
            onChange={(e) => {
              setTwelthschoolname(e.target.value);
              validateTenthSchoolName(e.target.value);
            }}
            error={!!twelthschoolnameError}
            helperText={twelthschoolnameError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ugcoursename"
            label="Name of UG Course"
            fullWidth
            style={textFieldStyle}
            value={ugcoursename}
            onChange={(e) => {
              setUgcoursename(e.target.value);
              validateUgCourseName(e.target.value);
            }}
            error={!!ugcoursenameError}
            helperText={ugcoursenameError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ugpercentage"
            label="UG Percentage"
            fullWidth
            style={textFieldStyle}
            value={ugpercentage}
            onChange={(e) => {
              setUgpercentage(e.target.value);
              validateUgPercentage(e.target.value);
            }}
            error={!!ugpercentageError}
            helperText={ugpercentageError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ugCGPA"
            label="UG CGPA"
            fullWidth
            style={textFieldStyle}
            value={ugCGPA}
            onChange={(e) => {
              setUgCGPA(e.target.value);
              validateUgCGPA(e.target.value);
            }}
            error={!!ugCGPAError}
            helperText={ugCGPAError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ugyearofgraduation"
            label="Year of Graduation (UG)"
            fullWidth
            style={textFieldStyle}
            value={ugyearofgraduation}
            onChange={(e) => {
              setUgyearofgraduation(e.target.value);
              validateUgYearOfGraduation(e.target.value);
            }}
            error={!!ugyearofgraduationError}
            helperText={ugyearofgraduationError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="collegename"
            label="College Name"
            fullWidth
            style={textFieldStyle}
            value={collegename}
            onChange={(e) => {
              setCollegename(e.target.value);
              validateCollegeName(e.target.value);
            }}
            error={!!collegenameError}
            helperText={collegenameError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="uguniversity"
            label="University of UG"
            fullWidth
            style={textFieldStyle}
            value={uguniversity}
            onChange={(e) => {
              setUguniversity(e.target.value);
              validateUgUniversity(e.target.value);
            }}
            error={!!uguniversityError}
            helperText={uguniversityError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="mcaaggregateCGPA"
            label="MCA Aggregate CGPA"
            fullWidth
            style={textFieldStyle}
            value={mcaaggregateCGPA}
            onChange={(e) => {
              setMcaaggregateCGPA(e.target.value);
              validateMcaAggregateCGPA(e.target.value);
            }}
            error={!!mcaaggregateCGPAError}
            helperText={mcaaggregateCGPAError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="activearrears"
            label="Active Arrears"
            fullWidth
            style={textFieldStyle}
            value={activearrears}
            onChange={(e) => {
              setActivearrears(e.target.value);
              validateActiveArrears(e.target.value);
            }}
            error={!!activearrearsError}
            helperText={activearrearsError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="historyofarrears"
            label="History of Arrears"
            fullWidth
            style={textFieldStyle}
            value={historyofarrears}
            onChange={(e) => {
              setHistoryofarrears(e.target.value);
              validateHistoryOfArrears(e.target.value);
            }}
            error={!!historyofarrearsError}
            helperText={historyofarrearsError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="university"
            label="University"
            fullWidth
            style={textFieldStyle}
            value={university}
            onChange={(e) => {
              setUniversity(e.target.value);
              validateUniversity(e.target.value);
            }}
            error={!!universityError}
            helperText={universityError}
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
          type="submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
}

export default EducationForm;

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

function PersonalInfoForm({ onNext }) {
  const { auth, setAuth } = useAuth();
  const [studentData, setStudentData] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [uniregno, setUniregno] = useState("");
  const [gender, setGender] = useState("");
  const [mobno, setMobno] = useState("");
  const [dob, setDob] = useState("");
  const [personalemail, setPersonalemail] = useState("");
  const [email, setEmail] = useState("");
  const [fathername, setFathername] = useState("");
  const [mothername, setMothername] = useState("");
  const [housename, setHousename] = useState("");
  const [postoffice, setPostoffice] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [nationality, setNationality] = useState("");

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [uniregnoError, setUniregnoError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [mobnoError, setMobnoError] = useState("");
  const [dobError, setDobError] = useState("");
  const [personalemailError, setPersonalemailError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fathernameError, setFathernameError] = useState("");
  const [mothernameError, setMothernameError] = useState("");
  const [housenameError, setHousenameError] = useState("");
  const [postofficeError, setPostofficeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [nationalityError, setNationalityError] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateFirstname = (value) => {
    if (!value) {
      setFirstnameError("First name is required");
    } else if (!/^[A-Za-z]+$/.test(value)) {
      setFirstnameError("First name should only contain letters");
    } else {
      setFirstnameError("");
    }
  };

  const validateLastname = (value) => {
    if (!value) {
      setLastnameError("Last name is required");
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      setLastnameError("Last name should only contain letters and spaces");
    } else {
      setLastnameError("");
    }
  };

  const validateUniregno = (value) => {
    if (!value) {
      setUniregnoError("Uni. Reg. Number is required");
    } else if (!/^[A-Za-z0-9]+$/i.test(value)) {
      setUniregnoError(
        "Uni. Reg. Number should only contain letters and numbers"
      );
    } else if (value.length !== 8) {
      setUniregnoError("Uni. Reg. Number should be 8 characters long");
    } else {
      setUniregnoError("");
    }
  };

  const validateGender = (value) => {
    if (!value) {
      setGenderError("Gender is required");
    } else {
      setGenderError("");
    }
  };
  const validatePhoneNumber = (value) => {
    // Define a regular expression pattern for a valid mobile number
    //const phonePattern = /^(?:(?:\+|00)91|0)[7-9]\d{9}$/;
    const phonePattern = /^[1-9]\d{9}$/;
    if (!value) {
      setMobnoError("Phone number is required");
    } else if (!phonePattern.test(value)) {
      setMobnoError(
        "Invalid phone number. Please enter a valid Indian mobile number."
      );
    } else {
      setMobnoError("");
    }
  };

  const validateDob = (value) => {
    if (!value) {
      setDobError("Date of Birth is required");
    } else {
      // Split the date string into month, day, and year parts
      const dateParts = value.split("/");

      if (dateParts.length !== 3) {
        setDobError("Invalid date format. Please use MM/DD/YYYY format.");
      } else {
        const month = parseInt(dateParts[0], 10);
        const day = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);

        // Check if month, day, and year are valid
        if (isNaN(month) || isNaN(day) || isNaN(year)) {
          setDobError("Invalid date format. Please use MM/DD/YYYY format.");
        } else {
          const dobDate = new Date(year, month - 1, day); // month is 0-based
          const today = new Date();
          const age = today.getFullYear() - dobDate.getFullYear();

          // Check if the date is a valid date and the person is at least 18 years old
          if (
            dobDate.getDate() === day &&
            dobDate.getMonth() === month - 1 &&
            dobDate.getFullYear() === year &&
            age >= 18
          ) {
            setDobError("");
          } else {
            setDobError(
              "Invalid date or age. You must be at least 18 years old."
            );
          }
        }
      }
    }
  };
  const validatePersonalEmail = (value) => {
    // Regular expression pattern for a valid email
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!value) {
      setPersonalemailError("Personal Email ID is required");
    } else if (!emailPattern.test(value)) {
      setPersonalemailError(
        "Invalid email format. Please provide a valid email address."
      );
    } else {
      setPersonalemailError("");
    }
  };
  const validateCollegeEmail = (value) => {
    // Regular expression pattern for a valid college email (adjust as needed)
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!value) {
      setEmailError("College Email ID is required");
    } else if (!emailPattern.test(value)) {
      setEmailError(
        "Invalid college email format. Please use a valid college email address."
      );
    } else {
      setEmailError("");
    }
  };
  const validateFatherName = (value) => {
    // Define your validation rules for the father's name here
    // For example, you can check if it contains only letters and spaces
    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setFathernameError("Father's name is required");
    } else if (!namePattern.test(value)) {
      setFathernameError(
        "Father's name should only contain letters and spaces"
      );
    } else {
      setFathernameError("");
    }
  };

  const validateMotherName = (value) => {
    // Define your validation rules for the mother's name here
    // For example, you can check if it contains only letters and spaces
    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setMothernameError("Mother's name is required");
    } else if (!namePattern.test(value)) {
      setMothernameError(
        "Mother's name should only contain letters and spaces"
      );
    } else {
      setMothernameError("");
    }
  };
  const validateHouseName = (value) => {
    // Define your validation rules for house name here
    // For example, you can check if it contains letters, numbers, and spaces
    const namePattern = /^[A-Za-z0-9 ]+$/;

    if (!value) {
      setHousenameError("House name is required");
    } else if (!namePattern.test(value)) {
      setHousenameError(
        "House name should contain only letters, numbers, and spaces"
      );
    } else {
      setHousenameError("");
    }
  };
  const validatePostOffice = (value) => {
    // Define your validation rules for post office here
    // For example, you can check if it contains only letters and spaces
    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setPostofficeError("Post office is required");
    } else if (!namePattern.test(value)) {
      setPostofficeError("Post office should only contain letters and spaces");
    } else {
      setPostofficeError("");
    }
  };
  const validateCity = (value) => {
    // Define your validation rules for city here
    // For example, you can check if it contains only letters and spaces
    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setCityError("City is required");
    } else if (!namePattern.test(value)) {
      setCityError("City should only contain letters and spaces");
    } else {
      setCityError("");
    }
  };
  const validateState = (value) => {
    // Define your validation rules for state here
    // For example, you can check if it contains only letters and spaces
    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setStateError("State is required");
    } else if (!namePattern.test(value)) {
      setStateError("State should only contain letters and spaces");
    } else {
      setStateError("");
    }
  };
  const validatePincode = (value) => {
    // Define your validation rules for pincode here
    // For example, you can check if it contains exactly 6 digits
    const pincodePattern = /^\d{6}$/;

    if (!value) {
      setPincodeError("Pincode is required");
    } else if (!pincodePattern.test(value)) {
      setPincodeError("Pincode should be a 6-digit number");
    } else {
      setPincodeError("");
    }
  };
  const validateNationality = (value) => {
    // Define your validation rules for nationality here
    // For example, you can check if it contains only letters and spaces
    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setNationalityError("Nationality is required");
    } else if (!namePattern.test(value)) {
      setNationalityError("Nationality should only contain letters and spaces");
    } else {
      setNationalityError("");
    }
  };

  useEffect(() => {
    setEmail(studentData.email || "");
    setFirstname(studentData.firstname || "");
    setLastname(studentData.lastname || "");
    setMobno(studentData.mobno || "");
    setGender(studentData.gender || "");
    setUniregno(studentData.uniregno || "");
  }, [
    studentData.email,
    studentData.firstname,
    studentData.lastname,
    studentData.mobno,
    studentData.gender,
    studentData.uniregno,
  ]);

  const personalData = {
    dob: dob,
    personalemail: personalemail,
    email: email, // Corrected field name
    fathername: fathername,
    mothername: mothername,
    housename: housename, // Assuming this is correct
    postoffice: postoffice,
    city: city,
    state: state,
    pincode: pincode,
    nationality: nationality,
  };

  const validateForm = () => {
    setIsFormValid(
      !firstnameError &&
        !lastnameError &&
        !uniregnoError &&
        !genderError &&
        !mobnoError &&
        !dobError &&
        !personalemailError &&
        !emailError &&
        !fathernameError &&
        !mothernameError &&
        !housenameError &&
        !postofficeError &&
        !cityError &&
        !stateError &&
        !pincodeError &&
        !nationalityError
    );
  };

  console.log(personalData);
  async function onSubmit(event) {
    event.preventDefault();
    validateFirstname(firstname);
    validateLastname(lastname);
    validateUniregno(uniregno);
    validateGender(gender);
    validatePhoneNumber(mobno);
    validateDob(dob);
    validatePersonalEmail(personalemail);
    validateCollegeEmail(email);
    validateFatherName(fathername);
    validateMotherName(mothername);
    validateHouseName(housename);
    validatePostOffice(postoffice);
    validateCity(city);
    validateState(state);
    validatePincode(pincode);
    validateNationality(nationality);

    validateForm();

    if (formSubmitted) {
      return;
    }

    if (isFormValid) {
      try {
        const res = await axios.post(
          "http://localhost:5000/studentdetails/personaldetails",
          personalData
        );
        setFormSubmitted(true);
        onNext();
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const studentId = auth._id;

    axios
      .get(`http://localhost:5000/get-user-byid/${studentId}`)
      .then((response) => {
        setStudentData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstname"
            label="First Name"
            color="primary"
            fullWidth
            value={firstname || studentData.firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
              validateFirstname(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            autoFocus
            error={!!firstnameError}
            helperText={firstnameError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="lastname"
            label="Last Name"
            fullWidth
            value={lastname || studentData.lastname}
            onChange={(e) => {
              setLastname(e.target.value);
              validateLastname(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            autoFocus
            error={!!lastnameError}
            helperText={lastnameError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="uniregno"
            label="Uni. Reg. Number"
            fullWidth
            value={uniregno || studentData.userId}
            onChange={(e) => {
              setUniregno(e.target.value);
              validateUniregno(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            autoFocus
            error={!!uniregnoError}
            helperText={uniregnoError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select
              name="gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                validateGender(e.target.value);
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {genderError && <span style={{ color: "red" }}>{genderError}</span>}
          </FormControl>
        </Grid>
        {/* Add the same InputProps to other text fields */}
        <Grid item xs={12} sm={6}>
          <TextField
            name="mobno"
            label="Phone Number"
            fullWidth
            value={mobno || studentData.phno}
            onChange={(e) => {
              setMobno(e.target.value);
              validatePhoneNumber(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!mobnoError}
            helperText={mobnoError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="dob"
            label="Date of Birth"
            fullWidth
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              validateDob(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!dobError}
            helperText={dobError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="personalemail"
            label="Personal Email ID"
            fullWidth
            value={personalemail}
            onChange={(e) => {
              setPersonalemail(e.target.value);
              validatePersonalEmail(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!personalemailError}
            helperText={personalemailError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="College Email ID"
            fullWidth
            value={email || studentData.email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateCollegeEmail(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!emailError}
            helperText={emailError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="fathername"
            label="Father Name"
            fullWidth
            value={fathername}
            onChange={(e) => {
              setFathername(e.target.value);
              validateFatherName(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!fathernameError}
            helperText={fathernameError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="mothername"
            label="Mother Name"
            fullWidth
            value={mothername}
            onChange={(e) => {
              setMothername(e.target.value);
              validateMotherName(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!mothernameError}
            helperText={mothernameError}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="housename"
            label="House Name"
            fullWidth
            value={housename}
            onChange={(e) => {
              setHousename(e.target.value);
              validateHouseName(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!housenameError}
            helperText={housenameError}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="postoffice"
            label="Post Office"
            fullWidth
            value={postoffice}
            onChange={(e) => {
              setPostoffice(e.target.value);
              validatePostOffice(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!postofficeError}
            helperText={postofficeError}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="city"
            label="City"
            fullWidth
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              validateCity(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!cityError}
            helperText={cityError}
          />
        </Grid>
        <Divider />
        <Divider />
        <Grid item xs={12} sm={4}>
          <TextField
            name="state"
            label="State"
            type="calender"
            fullWidth
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              validateState(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!stateError}
            helperText={stateError}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="pincode"
            label="Pincode"
            fullWidth
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              validatePincode(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!pincodeError}
            helperText={pincodeError}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="nationality"
            label="Nationality"
            fullWidth
            value={nationality}
            onChange={(e) => {
              setNationality(e.target.value);
              validateNationality(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!nationalityError}
            helperText={nationality}
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
          variant="contained"
          color="primary"
          style={{ paddingLeft: "40px", paddingRight: "40px" }}
          type="submit"
          disabled={formSubmitted}
        >
          Next
        </Button>
      </div>
    </form>
  );
}

export default PersonalInfoForm;

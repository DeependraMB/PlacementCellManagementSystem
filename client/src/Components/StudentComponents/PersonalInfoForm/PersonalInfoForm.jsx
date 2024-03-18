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
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

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

  const validateFirstname = (value) => {
    let isValid = true;

    const namePattern = /^[A-Za-z]+$/;

    if (!value) {
      setFirstnameError("First name is required");
      isValid = false;
    } else if (!namePattern.test(value)) {
      setFirstnameError("First name should only contain letters");
      isValid = false;
    } else {
      setFirstnameError("");
    }
    console.log(isValid);
    return isValid;
  };

  const validateLastname = (value) => {
    let isValid = true;

    // Define your validation rules for the last name here
    // For example, you can check if it contains only letters and spaces
    const namePattern = /^[A-Za-z\s]+$/;

    if (!value) {
      setLastnameError("Last name is required");
      isValid = false;
    } else if (!namePattern.test(value)) {
      setLastnameError("Last name should only contain letters and spaces");
      isValid = false;
    } else {
      setLastnameError("");
    }
    console.log(isValid);
    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validateUniregno = (value) => {
    let isValid = true;

    // Define your validation rules for the Uni. Reg. Number here
    // For example, you can check if it contains only letters and numbers
    const uniregnoPattern = /^[A-Za-z0-9]+$/i;

    if (!value) {
      setUniregnoError("Uni. Reg. Number is required");
      isValid = false;
    } else if (!uniregnoPattern.test(value)) {
      setUniregnoError(
        "Uni. Reg. Number should only contain letters and numbers"
      );
      isValid = false;
    } else if (value.length !== 8) {
      setUniregnoError("Uni. Reg. Number should be 8 characters long");
      isValid = false;
    } else {
      setUniregnoError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validateGender = (value) => {
    let isValid = true;

    if (!value) {
      setGenderError("Gender is required");
      isValid = false;
    } else {
      setGenderError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validatePhoneNumber = (value) => {
    let isValid = true;

    const phonePattern = /^[1-9]\d{9}$/;

    if (!value) {
      setMobnoError("Phone number is required");
      isValid = false;
    } else if (!phonePattern.test(value)) {
      setMobnoError(
        "Invalid phone number. Please enter a valid Indian mobile number."
      );
      isValid = false;
    } else {
      setMobnoError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validateDob = (value) => {
    let isValid = true;
    if (!value) {
      setDobError("Date of Birth is required");
      isValid = false;
    } else {
      setDobError("");
    }

    return isValid;
  };
  const validatePersonalEmail = (value) => {
    let isValid = true;

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!value) {
      setPersonalemailError("Personal Email ID is required");
      isValid = false;
    } else if (!emailPattern.test(value)) {
      setPersonalemailError(
        "Invalid email format. Please provide a valid email address."
      );
      isValid = false;
    } else {
      setPersonalemailError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validateCollegeEmail = (value) => {
    let isValid = true;

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!value) {
      setEmailError("College Email ID is required");
      isValid = false;
    } else if (!emailPattern.test(value)) {
      setEmailError(
        "Invalid college email format. Please use a valid college email address."
      );
      isValid = false;
    } else {
      setEmailError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validateFatherName = (value) => {
    let isValid = true;

    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setFathernameError("Father's name is required");
      isValid = false;
    } else if (!namePattern.test(value)) {
      setFathernameError(
        "Father's name should only contain letters and spaces"
      );
      isValid = false;
    } else {
      setFathernameError("");
    }

    return isValid;
  };

  const validateMotherName = (value) => {
    let isValid = true;

    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setMothernameError("Mother's name is required");
      isValid = false;
    } else if (!namePattern.test(value)) {
      setMothernameError(
        "Mother's name should only contain letters and spaces"
      );
      isValid = false;
    } else {
      setMothernameError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validateHouseName = (value) => {
    let isValid = true;

    const namePattern = /^[A-Za-z0-9 ]+$/;

    if (!value) {
      setHousenameError("House name is required");
      isValid = false;
    } else if (!namePattern.test(value)) {
      setHousenameError(
        "House name should contain only letters, numbers, and spaces"
      );
      isValid = false;
    } else {
      setHousenameError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validatePostOffice = (value) => {
    let isValid = true;

    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setPostofficeError("Post office is required");
      isValid = false;
    } else if (!namePattern.test(value)) {
      setPostofficeError("Post office should only contain letters and spaces");
      isValid = false;
    } else {
      setPostofficeError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validateCity = (value) => {
    let isValid = true;

    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setCityError("City is required");
      isValid = false;
    } else if (!namePattern.test(value)) {
      setCityError("City should only contain letters and spaces");
      isValid = false;
    } else {
      setCityError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validateState = (value) => {
    let isValid = true;

    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setStateError("State is required");
      isValid = false;
    } else if (!namePattern.test(value)) {
      setStateError("State should only contain letters and spaces");
      isValid = false;
    } else {
      setStateError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validatePincode = (value) => {
    let isValid = true;

    const pincodePattern = /^\d{6}$/;

    if (!value) {
      setPincodeError("Pincode is required");
      isValid = false;
    } else if (!pincodePattern.test(value)) {
      setPincodeError("Pincode should be a 6-digit number");
      isValid = false;
    } else {
      setPincodeError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validateNationality = (value) => {
    let isValid = true;

    const namePattern = /^[A-Za-z ]+$/;

    if (!value) {
      setNationalityError("Nationality is required");
      isValid = false;
    } else if (!namePattern.test(value)) {
      setNationalityError("Nationality should only contain letters and spaces");
      isValid = false;
    } else {
      setNationalityError("");
      // Set isValid to true if the validation passes
    }

    return isValid; // Return the boolean indicating whether the value is valid
  };

  const validateForm = () => {
    // Validate individual form fields
    const isFirstNameValid = validateFirstname(firstname);
    const isLastNameValid = validateLastname(lastname);
    const isUniregnoValid = validateUniregno(uniregno);
    const isGenderValid = validateGender(gender);
    const isPhoneNumberValid = validatePhoneNumber(mobno);
    const isDobValid = validateDob(dob);
    const isPersonalEmailValid = validatePersonalEmail(personalemail);
    const isCollegeEmailValid = validateCollegeEmail(email);
    const isFatherNameValid = validateFatherName(fathername);
    const isMotherNameValid = validateMotherName(mothername);
    const isHouseNameValid = validateHouseName(housename);
    const isPostOfficeValid = validatePostOffice(postoffice);
    const isCityValid = validateCity(city);
    const isStateValid = validateState(state);
    const isPincodeValid = validatePincode(pincode);
    const isNationalityValid = validateNationality(nationality);

    // Set the form validity based on all validations
    setIsFormValid(
      isFirstNameValid &&
        isLastNameValid &&
        isUniregnoValid &&
        isGenderValid &&
        isPhoneNumberValid &&
        isDobValid &&
        isPersonalEmailValid &&
        isCollegeEmailValid &&
        isFatherNameValid &&
        isMotherNameValid &&
        isHouseNameValid &&
        isPostOfficeValid &&
        isCityValid &&
        isStateValid &&
        isPincodeValid &&
        isNationalityValid
    );

    // Return the overall form validity
    return (
      isFirstNameValid &&
      isLastNameValid &&
      isUniregnoValid &&
      isGenderValid &&
      isPhoneNumberValid &&
      isDobValid &&
      isPersonalEmailValid &&
      isCollegeEmailValid &&
      isFatherNameValid &&
      isMotherNameValid &&
      isHouseNameValid &&
      isPostOfficeValid &&
      isCityValid &&
      isStateValid &&
      isPincodeValid &&
      isNationalityValid
    );
  };

  console.log(studentData);
  useEffect(() => {
    setEmail(studentData.email || "");
    setFirstname(studentData.firstname || "");
    setLastname(studentData.lastname || "");
    setMobno(studentData.mobno || "");
    setGender(studentData.gender || "");
    setUniregno(studentData.uniregno || "");
    setDob(studentData.dob || "");
    setPersonalemail(studentData.personalemail || "");
    setFathername(studentData.fathername || "");
    setMothername(studentData.mothername || "");
    setHousename(studentData.housename || "");
    setPostoffice(studentData.postoffice || "");
    setCity(studentData.city || "");
    setState(studentData.state || "");
    setPincode(studentData.pincode || "");
    setNationality(studentData.nationality || "");
  }, [studentData]);

  const personalData = {
    dob: dob,
    personalemail: personalemail,
    email: email,
    fathername: fathername,
    mothername: mothername,
    housename: housename,
    postoffice: postoffice,
    city: city,
    state: state,
    pincode: pincode,
    nationality: nationality,
  };

  const userData = {
    email: email,
    firstname: firstname,
    lastname: lastname,
    gender: gender,
    mobno: mobno,
    uniregno: uniregno,
  };

  async function onSubmit(event) {
    event.preventDefault();

    const isValid = validateForm();

    console.log("Mundalilll", isValid);

    if (isValid) {
      try {
        const res = await axios.post(
          "http://localhost:5000/studentdetails/personaldetails",
          personalData
        );

        const res1 = await axios.post(
          "http://localhost:5000/studentdetails/userdetails",
          userData
        );
        onNext({ personalData, userData }, "personalData");
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const studentId = auth._id;
    const studentEmail = auth.email;
    console.log(studentEmail);

    const fetchData = async () => {
      try {
        // First API call
        const userByIdResponse = await axios.get(
          `http://localhost:5000/get-user-byid/get-user-byid/get-user-byid/${studentId}`
        );
        setStudentData(userByIdResponse.data);

        // Second API call
        const userByEmailResponse = await axios.get(
          `http://localhost:5000/get-user-by-email/get-user-by-email/${studentEmail}`
        );

        // Merge data from both responses
        const updatedData = {
          ...userByIdResponse.data,
          ...userByEmailResponse.data,
        };

        setStudentData(updatedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the fetchData function to start the data fetching process
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
            value={firstname || ""}
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
            value={lastname || ""}
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
            value={uniregno || ""}
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
        {console.log(gender, "ppppppppp")}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select
              name="gender"
              value={gender || ""}
              onChange={(e) => {
                setGender(e.target.value);
                validateGender(e.target.value);
              }}
            >
              {/* <MenuItem value="" disabled={true}>Please Select Gender</MenuItem> */}
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {genderError && <span style={{ color: "red" }}>{genderError}</span>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="mobno"
            label="Phone Number"
            fullWidth
            value={mobno || ""}
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
            value={dob || ""}
            onChange={(e) => {
              setDob(e.target.value);
              validateDob(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!dobError}
            helperText={dobError}
            type="date"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="personalemail"
            label="Personal Email ID"
            fullWidth
            value={personalemail || ""}
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
            value={email || ""}
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
            value={fathername || ""}
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
            value={mothername || ""}
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
            value={housename || ""}
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
            value={postoffice || ""}
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
            value={city || ""}
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
            value={state || ""}
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
            value={pincode || ""}
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
            value={nationality || ""}
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
        >
          Next
        </Button>
      </div>
    </form>
  );
}

export default PersonalInfoForm;

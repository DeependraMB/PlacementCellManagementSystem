import React, { useState } from "react";
import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import axios from "axios";

import PersonalInfoForm from "../PersonalInfoForm/PersonalInfoForm";
import EducationForm from "../EducationForm/EducationForm";
import SkillsForm from "../SkillsForm/SkillsForm";
import DeclarationForm from "../DeclarationForm/DeclarationForm";

const steps = [
  "Step 1: Personal Information",
  "Step 2: Education Records",
  "Step 3: Skills",
  "Step 4: Declaration",
];

function ProfileUpdateStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    uniregno: "",
    gender: "",
    phno: "",
    dob: "",
    personalEmail: "",
    collegeEmail: "",
    fatherName: "",
    motherName: "",
    houseName: "",
    postOffice: "",
    city: "",
    state: "",
    pincode: "",
    nationality: "",
    department: "",
    batch: "",
    graduationyear: "",
    tenthPercentage: "",
    tenthCGPA: "",
    tenthBoard: "",
    tenthSchoolName: "",
    twelfthPercentage: "",
    twelfthCGPA: "",
    twelfthBoard: "",
    twelfthSchoolName: "",
    ugCourseName: "",
    ugPercentage: "",
    ugCGPA: "",
    ugYearOfGraduation: "",
    collegeName: "",
    ugUniversity: "",
    mcaAggregateCGPA: "",
    activeArrears: "",
    historyOfArrears: "",
    university: "",
    technicalSkills: "",
    certifications: "",
    internships: "",
    projects: "",
    githubLink: "",
    linkedinLink: "",
    achievements: "",
    languagesKnown: "",
    profilePhoto: "",
    resume: "",
    workLocation: "",
  });
  console.log(formData)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepSubmit = () => {
    window.scrollTo(0, 0);
    if (activeStep === steps.length - 1) {
      // If this is the last step, gather the data and send it to the backend
      sendProfileData(formData);
    } else {
      handleNext();
    }
  };

  const sendProfileData = (data) => {
    axios
      .post("http://localhost:5000/studentDetails/studentDetails", data)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <div className="" style={{ marginTop: "70px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography variant="h5">Profile Updated Successfully!</Typography>
            {/* You can display a success message here */}
          </div>
        ) : (
          <div>
            <Typography
              variant="h6"
              sx={{
                marginTop: "40px",
                fontWeight: "bold",
              }}
            >
              {steps[activeStep]}
            </Typography>

            {activeStep === 0 && (
              <PersonalInfoForm
                data={formData}
                setData={setFormData}
                onNext={handleStepSubmit}
                onBack={handleBack}
              />
            )}
            {activeStep === 1 && (
              <EducationForm
                data={formData}
                setData={setFormData}
                onNext={handleStepSubmit}
                onBack={handleBack}
              />
            )}
            {activeStep === 2 && (
              <SkillsForm
                data={formData}
                setData={setFormData}
                onNext={handleStepSubmit}
                onBack={handleBack}
              />
            )}
            {activeStep === 3 && (
              <DeclarationForm
                data={formData}
                setData={setFormData}
                onNext={handleStepSubmit}
                onBack={handleBack}
              />
            )}

            {isLastStep && (
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={handleStepSubmit}
              >
                Submit
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileUpdateStepper;

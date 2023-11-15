import React, { useState } from "react";
import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import PersonalInfoForm from "../PersonalInfoForm/PersonalInfoForm";
import EducationForm from "../EducationForm/EducationForm";
import SkillsForm from "../SkillsForm/SkillsForm";
import DeclarationForm from "../DeclarationForm/DeclarationForm";
import { toast } from "react-toastify";

const steps = [
  "Step 1: Personal Information",
  "Step 2: Education Records",
  "Step 3: Skills",
  "Step 4: Declaration"
];

function ProfileUpdateStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState({});
  const history = useNavigate();
  const [success, setSuccess] = useState(true)


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepSubmit = (data, key) => {
    window.scrollTo(0, 0);
    if (activeStep === steps.length - 1) {
      // Handle final step submission logic here
      setSuccess(false); 
      localStorage.setItem('profileUpdateSuccess', 'false'); 
      history("/studenthome");
      toast.success("Update Profile Successfully!!!");
    } else {
      if(key) {
        setFormState({
          ...formState,
          [key]: data,
        })
      }
     
      handleNext();
    }
  };

  const isLastStep = activeStep === steps.length - 1;

  // Function to handle clicking on a step label
  const handleStepLabelClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  return (
    <div className="" style={{ marginTop: "70px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel onClick={() => handleStepLabelClick(index)}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography variant="h5">Profile Updated Successfully!</Typography>
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
              <PersonalInfoForm onNext={handleStepSubmit} />
            )}
            {activeStep === 1 && (
              <EducationForm onNext={handleStepSubmit} onBack={handleBack} />
            )}
            {activeStep === 2 && (
              <SkillsForm onNext={handleStepSubmit} onBack={handleBack} />
            )}
            {activeStep === 3 && <DeclarationForm formData={formState} onBack={handleBack} />}
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

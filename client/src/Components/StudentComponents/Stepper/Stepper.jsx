import React, { useState } from "react";
import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import axios from "axios";

import PersonalInfoForm from "../PersonalInfoForm/PersonalInfoForm";
import EducationForm from "../EducationForm/EducationForm";
import SkillsForm from "../SkillsForm/SkillsForm";

const steps = [
  "Step 1: Personal Information",
  "Step 2: Education Records",
  "Step 3: Skills",
];

function ProfileUpdateStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepSubmit = () => {
    window.scrollTo(0, 0);
    if (activeStep === steps.length - 1) {
    
    } else {
      handleNext();
    }
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

            {/* {isLastStep && (
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={handleStepSubmit}
              >
                Submit
              </Button>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileUpdateStepper;

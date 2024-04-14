import React, { useState } from "react";
import { TextField, Grid, Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const blueBorder = {
  borderBottom: "2px solid #2196F3",
};

const WorkshopForm = () => {
  const [workshopTitle, setWorkshopTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");
  const [facilitator, setFacilitator] = useState("");
  const [description, setDescription] = useState("");
  const [virtualPlatformLink, setVirtualPlatformLink] = useState("");
  const [poster, setPoster] = useState(null);

  const [workshopTitleError, setWorkshopTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [facilitatorError, setFacilitatorError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [virtualPlatformLinkError, setVirtualPlatformLinkError] = useState("");
  const [posterError, setPosterError] = useState("");
  const navigate = useNavigate();

  const validateWorkshopTitle = (value) => {
    if (!value) {
      setWorkshopTitleError("Workshop Title is required");
      return false;
    } else {
      setWorkshopTitleError("");
      return true;
    }
  };

  const validateDate = (value) => {
    if (!value) {
      setDateError("Date is required");
      return false;
    } else {
      setDateError("");
      return true;
    }
  };

  const validateTime = (value) => {
    if (!value) {
      setTimeError("Time is required");
      return false;
    } else {
      setTimeError("");
      return true;
    }
  };

  const validateDuration = (value) => {
    if (!value) {
      setDurationError("Duration is required");
      return false;
    } else {
      setDurationError("");
      return true;
    }
  };

  const validateType = (value) => {
    if (!value) {
      setTypeError("Type is required");
      return false;
    } else {
      setTypeError("");
      return true;
    }
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
    validateType(value);
  };

  const handleWorkshopTitleChange = (e) => {
    const value = e.target.value;
    setWorkshopTitle(value);
    validateWorkshopTitle(value);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    validateDate(value);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setTime(value);
    validateTime(value);
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setDuration(value);
    validateDuration(value);
  };

  const validateFacilitator = (value) => {
    if (!value) {
      setFacilitatorError("Facilitator is required");
      return false;
    } else {
      setFacilitatorError("");
      return true;
    }
  };
  
  const validateDescription = (value) => {
    if (!value) {
      setDescriptionError("Description is required");
      return false;
    } else {
      setDescriptionError("");
      return true;
    }
  };
  
  const validateVirtualPlatformLink = (value) => {
    if (!value) {
      setVirtualPlatformLinkError("Virtual Platform Link is required");
      return false;
    } else {
      setVirtualPlatformLinkError("");
      return true;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all fields before submission
    const isWorkshopTitleValid = validateWorkshopTitle(workshopTitle);
    const isDateValid = validateDate(date);
    const isTimeValid = validateTime(time);
    const isDurationValid = validateDuration(duration);
    const isTypeValid = validateType(type);
    const isFacilitatorValid = validateFacilitator(facilitator);
    const isDescriptionValid = validateDescription(description);
    const isVirtualPlatformLinkValid = validateVirtualPlatformLink(
      virtualPlatformLink
    );
    // Add validation for poster if needed
  
    // Proceed with form submission if all fields are valid
    if (
      isWorkshopTitleValid &&
      isDateValid &&
      isTimeValid &&
      isDurationValid &&
      isTypeValid &&
      isFacilitatorValid &&
      isDescriptionValid &&
      isVirtualPlatformLinkValid
      // Add condition for poster if needed
    ) {
      try {
        const formData = new FormData();
        formData.append("workshop_title", workshopTitle);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("duration", duration);
        formData.append("type", type);
        formData.append("facilitator", facilitator);
        formData.append("description", description);
        formData.append("virtual_platform_link", virtualPlatformLink);
        formData.append("poster", poster);
  
        const response = await fetch(
          "http://localhost:5000/workshop/add-workshop",
          {
            method: "POST",
            body: formData,
          }
        );
  
        const data = await response.json();
  
        if (response.ok) {
          console.log("Workshop details added successfully!", data);
          navigate("/workshop-list");
        } else {
          console.error("Error adding workshop details:", data.message);
        }
      } catch (error) {
        console.error("Internal Server Error:", error);
      }
    }
  };
  

  return (
    <div
      style={{
        backgroundImage: "url('/bg6.jpg')",
        backgroundSize: "cover",
        padding: "80px 80px",
      }}
    >
      <Box
        component={Paper}
        elevation={3}
        sx={{ padding: "20px", maxWidth: "600px", margin: "" }}
      >
        <Typography variant="h5" gutterBottom style={{ fontFamily: "nunito" }}>
          Add Workshop
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="workshopTitle"
                label="Workshop Title"
                fullWidth
                value={workshopTitle}
                onChange={(e) => setWorkshopTitle(e.target.value)}
                InputProps={{ style: blueBorder }}
                error={!!workshopTitleError}
                helperText={workshopTitleError}
                onBlur={(e) => validateWorkshopTitle(e.target.value)}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="date"
                label="Date"
                type="date"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputProps={{ style: blueBorder }}
                error={!!dateError}
                helperText={dateError}
                onBlur={(e) => validateDate(e.target.value)}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="time"
                label="Time"
                type="time"
                fullWidth
                value={time}
                onChange={handleTimeChange}
                InputProps={{ style: blueBorder }}
                error={!!timeError}
                helperText={timeError}
                onBlur={(e) => validateTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="duration"
                label="Duration"
                fullWidth
                value={duration}
                onChange={handleDurationChange}
                InputProps={{ style: blueBorder }}
                error={!!durationError}
                helperText={durationError}
                onBlur={(e) => validateDuration(e.target.value)}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="type"
                label="Type"
                fullWidth
                value={type}
                onChange={handleTypeChange}
                InputProps={{ style: blueBorder }}
                error={!!typeError}
                helperText={typeError}
                onBlur={(e) => validateType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="facilitator"
                label="Facilitator"
                fullWidth
                value={facilitator}
                onChange={(e) => setFacilitator(e.target.value)}
                InputProps={{ style: blueBorder }}
                error={!!facilitatorError}
                helperText={facilitatorError}
                onBlur={(e) => validateFacilitator(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{ style: blueBorder }}
                error={!!descriptionError}
                helperText={descriptionError}
                onBlur={(e) => validateDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="virtualPlatformLink"
                label="Virtual Platform Link"
                fullWidth
                value={virtualPlatformLink}
                onChange={(e) => setVirtualPlatformLink(e.target.value)}
                InputProps={{ style: blueBorder }}
                error={!!virtualPlatformLinkError}
                helperText={virtualPlatformLinkError}
                onBlur={(e) => validateVirtualPlatformLink(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPoster(e.target.files[0])}
                style={{ display: "none" }}
                id="poster"
              />
              <label htmlFor="poster">
                <Button
                  variant="outlined"
                  component="span"
                  style={{ marginTop: "20px" }}
                >
                  Upload Poster
                </Button>
              </label>
              <Typography variant="body2" style={{ marginLeft: "10px" }}>
                {poster ? poster.name : "No file chosen"}
              </Typography>
              {posterError && (
                <Typography variant="body2" color="error">
                  {posterError}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            type="submit"
          >
            Add Workshop
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default WorkshopForm;

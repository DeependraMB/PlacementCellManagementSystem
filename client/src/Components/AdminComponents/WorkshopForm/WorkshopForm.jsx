import React, { useState } from "react";
import { TextField, Grid, Button, Typography, Box, Paper } from "@mui/material";

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
  const [poster, setPoster] = useState(null); // Updated to accept image file

  const [workshopTitleError, setWorkshopTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [facilitatorError, setFacilitatorError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [virtualPlatformLinkError, setVirtualPlatformLinkError] = useState("");
  const [posterError, setPosterError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!workshopTitle.trim()) {
      setWorkshopTitleError("Workshop Title is required");
      isValid = false;
    } else {
      setWorkshopTitleError("");
    }

    if (!date) {
      setDateError("Date is required");
      isValid = false;
    } else {
      setDateError("");
    }

    if (!time) {
      setTimeError("Time is required");
      isValid = false;
    } else {
      setTimeError("");
    }

    if (!duration) {
      setDurationError("Duration is required");
      isValid = false;
    } else {
      setDurationError("");
    }

    if (!type) {
      setTypeError("Type is required");
      isValid = false;
    } else {
      setTypeError("");
    }

    if (!facilitator.trim()) {
      setFacilitatorError("Facilitator is required");
      isValid = false;
    } else {
      setFacilitatorError("");
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!virtualPlatformLink.trim()) {
      setVirtualPlatformLinkError("Virtual Platform Link is required");
      isValid = false;
    } else {
      setVirtualPlatformLinkError("");
    }

    if (!poster) {
      setPosterError("Poster is required");
      isValid = false;
    } else {
      setPosterError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
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

        const response = await fetch("http://localhost:5000/workshop/add-workshop", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Workshop details added successfully!", data);
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
      style={{ backgroundImage: "url('/bg6.jpg')", backgroundSize: "cover", padding: "80px 80px" }}
    >
      <Box
        component={Paper}
        elevation={3}
        sx={{
          padding: "20px",
          maxWidth: "600px",
          margin: "",
        }}
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="time"
                label="Time"
                type="time"
                fullWidth
                value={time}
                onChange={(e) => setTime(e.target.value)}
                InputProps={{ style: blueBorder }}
                error={!!timeError}
                helperText={timeError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="duration"
                label="Duration"
                fullWidth
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                InputProps={{ style: blueBorder }}
                error={!!durationError}
                helperText={durationError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="type"
                label="Type"
                fullWidth
                value={type}
                onChange={(e) => setType(e.target.value)}
                InputProps={{ style: blueBorder }}
                error={!!typeError}
                helperText={typeError}
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{ style: blueBorder }}
                error={!!descriptionError}
                helperText={descriptionError}
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

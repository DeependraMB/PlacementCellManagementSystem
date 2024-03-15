import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Box,
  CardMedia,
} from "@mui/material";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import { useAuth } from "../../../Context/AuthContext";

const WorkshopList = () => {
  const [workshops, setWorkshops] = useState([]);
  const { auth } = useAuth();

  // Define fetchWorkshops globally
  const fetchWorkshops = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/workshop/get-workshop"
      );
      setWorkshops(response.data.data);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const name = auth.name;
  const email = auth.email;

  const registerParticipant = async (workshopId) => {
    try {
      const response = await axios.post("http://localhost:5000/workshop/workshop-participants", {
        workshopId,
        name,
        email,
      });

      if (response.status === 200) {
        // Participant registered successfully
        // Refresh the workshop list
        fetchWorkshops(); // Call the fetchWorkshops function
      } else {
        console.error("Failed to register participant:", response.data.error);
      }
    } catch (error) {
      console.error("Error registering participant:", error);
    }
  };

  const joinMeeting = (meetingLink) => {
    window.open(meetingLink, "_blank"); 
  };

  const sortedWorkshops = [...workshops].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Box>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          marginTop: "10px",
        }}
      >
        <Paper
          elevation={1}
          style={{
            width: "fit-content",
            height: "fit-content",
            marginRight: "10px",
            marginTop: "21px",
            padding: "8px 8px 8px 8px",
            marginLeft: "14px",
          }}
        >
          <CastForEducationIcon sx={{ color: "green" }} />
        </Paper>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            marginTop: "20px",
            fontWeight: "bolder",
            fontFamily: "nunito",
            textAlign: "start",
          }}
        >
          Workshop List
        </Typography>
      </div>
      <Grid container spacing={3} sx={{ padding: "40px 40px 40px 40px" }}>
        {sortedWorkshops.map((workshop) => (
          <Grid key={workshop._id} item xs={12} sm={6} md={3}>
            <Paper elevation={3} style={{ height: "100%" }}>
              <Card
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {workshop.poster && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:5000/workshop/get-poster/${workshop.poster.slice(
                      8
                    )}`}
                    alt={workshop.workshop_title}
                    style={{ objectFit: "cover" }}
                  />
                )}
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom  style={{fontWeight: "bolder"}}>
                    {workshop.workshop_title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {workshop.facilitator}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {new Date(workshop.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Time: {workshop.time}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Duration: {workshop.duration}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "15px",width: "100%" }}
                    onClick={() => joinMeeting(workshop.virtual_platform.link)}
                  >
                    {/* {workshop.participants.includes(email) ? "Join" : "Register"} */}
                    Join
                  </Button>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkshopList;

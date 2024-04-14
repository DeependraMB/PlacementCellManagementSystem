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
import { Link } from "react-router-dom";

const WorkshopList = () => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
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

    fetchWorkshops();
  }, []);

  return (
    <Box>
      <div
        style={{
          display: "flex",
          alignItems: "center", // Align items in the vertical center
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
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
              marginTop: "24px",
              fontWeight: "bolder",
              fontFamily: "nunito",
              textAlign: "start",
            }}
          >
            Workshop List
          </Typography>
        </div>
        <Button
        variant="contained"
        color="primary"
        component={Link}
        name="add-workshop-button"
        to="/workshop-form"
        style={{ marginTop: "20px", marginLeft: "auto", marginRight: "14px" }}
      >
        Add Workshop
      </Button>
      </div>
      <Grid container spacing={3} sx={{ padding: "40px 40px 40px 40px" }}>
        {workshops.map((workshop) => (
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
                  <Typography variant="h6" gutterBottom>
                    {workshop.workshop_title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {workshop.facilitator}
                  </Typography>
                  {/* <Typography variant="body2" color="textSecondary">
                    {workshop.description}
                  </Typography> */}
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
                    style={{ marginTop: "auto" }}
                  >
                    Report
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

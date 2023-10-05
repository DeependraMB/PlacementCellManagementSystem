import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography';
import { useAuth } from "../../Context/AuthContext";

function StudentHomeBoxes() {
    const { auth, setAuth } = useAuth();
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          sx={{ marginTop: "40px" }}
        >
          <Grid
            item
            xs={3}
            sx={{
              backgroundColor: "#ffff",
              marginLeft: "35px",
              height: "80vh",
              borderRadius: "10px",
            }}
          >
            <div className="py-3">
              <Avatar sx={{ width: "250px", height: "250px", margin: "auto" }}>
                H
              </Avatar>
              <Typography variant="h4" component="h2">
                {auth.name}
              </Typography>
              <Typography variant="h5" component="h3">
                {auth.email}
              </Typography>
            </div>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              backgroundColor: "#ffff",
              height: "34vh",
              marginLeft: "25px",
              float: "left",
              flexBasis: "100%", // Set flexBasis to 100% for full width
              borderRadius: "20px",
            }}
          >
            <div style={{ paddingTop: "80px", fontWeight: "bold" }}>
              Unread Messages
            </div>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              backgroundColor: "#ffff",
              height: "34vh",
              marginLeft: "20px",
              float: "left",
              flexBasis: "100%", // Set flexBasis to 100% for full width
              borderRadius: "20px",
            }}
          >
            <div
              className=""
              style={{ paddingTop: "80px", fontWeight: "bold" }}
            >
              Notifications
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default StudentHomeBoxes;

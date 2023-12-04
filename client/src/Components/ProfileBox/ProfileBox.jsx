


import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import PlacementStatistics from "../../Components/Charts/PlacementStatistics"; // Import your PlacementStatistics component

function ProfileBox({ name, email, department, role, lastname, profilephoto }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2}>
        {/* ProfileBox component */}
        <Box
          sx={{
            backgroundColor: "#ffff",
            height: "75vh",
            borderRadius: "10px",
            width: "350px",
            paddingTop: "15px",
            marginBottom:"100px"
          }}
          className="shadow"
        >
         <div className="">
            <Typography variant="h5" component="h2" sx={{paddingRight: "260px", color: "grey" , fontSize: "1rem"}}>
              Profile
            </Typography>
          </div>
          <div className="py-3">
            <Avatar
              src={`http://localhost:5000/get-profile-photo/get-profile-photo/get-profile-photo/${profilephoto}`}
              alt="User Avatar"
              sx={{
                width: "220px",
                height: "220px",
                margin: "auto",
                fontSize: "90px",
                border: ".1px solid grey",
              }}
            />
            <Typography variant="h5" component="h2" sx={{ fontSize: "2.5rem" }}>
              {name + " " + lastname}
            </Typography>
            {/* <Typography variant="h7" component="h5" sx={{ fontSize: "1.2rem" }}>
              {email}
            </Typography> */}
            <Typography
              variant="h7"
              component="h5"
              sx={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
            >
              {department}
            </Typography>
            <Typography
              variant="h7"
              component="h5"
              sx={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
            >
              {role}
            </Typography>

            {/* Button for viewing profile */}

            <div className="py-3 px-3 my-5">
              <Button variant="outlined" color="primary" fullWidth>
                View Profile
              </Button>
            </div>
          </div>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        {/* PlacementStatistics component */}
        <PlacementStatistics />
      </Grid>
    </Grid>
  );
}

export default ProfileBox;


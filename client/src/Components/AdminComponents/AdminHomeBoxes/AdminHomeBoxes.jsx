import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../Context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function AdminHomeBoxes() {
   const { auth, setAuth } = useAuth();
  return (
    <div className="">
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 3, sm: 2, md: 2 }}
          sx={{ marginTop: "40px" }}
        >
          {/* <Grid
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
              {/* <Typography variant="h4" component="h2">
                {auth.name}
              </Typography>
              <Typography variant="h5" component="h3">
                {auth.email}
              </Typography> */}
          {/* </div>
          </Grid> */}
          
          <div>
            <Button
              component={Link}
              to="/student-management"
              variant="contained"
              sx={{
                backgroundColor: "white",
                height: "34vh",
                marginLeft: "140px",
                float: "left",
                flexBasis: "100%",
                borderRadius: "20px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "23px",
                }}
              >
                Student Management
              </div>
            </Button>
          </div>
          <Grid
            item
            xs={3}
            sx={{
              backgroundColor: "white",
              height: "34vh",
              marginLeft: "30px",
              float: "left",
              flexBasis: "100%", // Set flexBasis to 100% for full width
              borderRadius: "20px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <div
              className=""
              style={{
                paddingTop: "80px",
                fontWeight: "bold",
                fontSize: "23px",
              }}
            >
              Add Teacher
            </div>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              backgroundColor: "white",
              height: "34vh",
              marginLeft: "35px",
              float: "left",
              flexBasis: "100%", // Set flexBasis to 100% for full width
              borderRadius: "20px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <div
              style={{
                paddingTop: "80px",
                fontWeight: "bold",
                fontSize: "23px",
              }}
            >
              Feedbacks
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AdminHomeBoxes;

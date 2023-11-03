import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import NotesIcon from "@mui/icons-material/Notes";
import './TeacherHomeBoxes.css'; // Add your CSS class for styling

function TeacherHomeBoxes() {
  return (
    <div className="h-100" style={{ backgroundColor: '#f0ffff', padding: '20px 30px 0px' }}>
      <div className="py-3" style={{ textAlign: "start" }}>
        <Typography
          variant="h5"
          component="h7"
          sx={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Welcome, Teacher!!!
        </Typography>
      </div>
      <Box sx={{ width: "100%", marginTop: "20px" }}>
        <div className="row justify-content-center">
          <div className="ui-block col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div className="ui-item ui-red">
              <div className="left">
                <NotificationsIcon className="icon1" />
              </div>
              <div className="right">
                <h4>9382</h4>
                <p>Notifications</p>
              </div>
            </div>
          </div>
          <div className="ui-block col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div className="ui-item ui-yellow">
              <div className="left">
                <SmsOutlinedIcon className="icon2" />
              </div>
              <div className="right">
                <h4>74</h4>
                <p>Messages</p>
              </div>
            </div>
          </div>
          <div className="ui-block col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div className="ui-item ui-green">
              <div className="left">
                <PersonIcon className="icon3" />
              </div>
              <div className="right">
                <h4>32</h4>
                <p>Profile</p>
              </div>
            </div>
          </div>
          <div className="ui-block col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div className="ui-item ui-blue">
              <div className="left">
                <NotesIcon className="icon4" />
              </div>
              <div className="right">
                <h4>32</h4>
                <p>Notes</p>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default TeacherHomeBoxes;

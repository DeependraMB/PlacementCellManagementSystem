import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../Context/AuthContext";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotesIcon from '@mui/icons-material/Notes';
import PersonIcon from '@mui/icons-material/Person';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import './StudentHomeBoxes.css'
import ProfileUpdateMessage from './ProfileUpdateMessage';
import PlacementStatistics from "../../Charts/PlacementStatistics";
import ProfileBox from "../../ProfileBox/ProfileBox";
import axios from "axios";

function StudentHomeBoxes() {
  const { auth } = useAuth();
  const [student,setStudent]= useState("");
  const [skills,setSkillDetails]= useState("");

  useEffect(() => {
    // Fetch both teacher data and department name
    axios
      .get(
        `http://localhost:5000/get-user-byid/get-user-byid/get-user-byid/${auth._id}`
      )
      .then((response) => {
        setStudent({
          ...response.data,
        });

        return axios.get(
          `http://localhost:5000/get-department-name/get-department-name/get-department-name/${response.data.departmentId}`
        );
      })
      .then((response) => {
        console.log(response.data);

        setStudent((prevData) => ({
          ...prevData,
          ...response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      

    
  }, [auth._id]);
  console.log(student);

  useEffect(() => {
    // Replace "user@example.com" with the actual user's email or get it from your authentication context
   

    axios.get(`http://localhost:5000/get-skills-details/get-skills-details/get-skills-details/${auth.email}`)
      .then(response => {
        setSkillDetails(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching skill details:", error);
      });
  }, []);

  return (
    <div className="h-300" style={{ backgroundColor: '#f0ffff', padding: '20px 30px 0px' }}>
       <ProfileUpdateMessage />
      <div className="py-3" style={{ textAlign: "start"}}>
        <Typography
          variant="h5"
          component="h7"
          sx={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          Welcome,{auth.name}!!!
        </Typography>
      </div>
      <Box sx={{ width: "100%", marginTop: "20px" }}>
        <div className="row justify-content-center">
          {/* <div className="ui-block col-xl-2 col-lg-4 col-md-6 col-sm-12 bg-white mx-3 py-5 rounded-3">
            <div className="ui-item ui-blue">
              <div className="left">
              <WorkOutlineIcon />
              </div>
              <div className="right">
                <h4>22</h4>
                <p>Applications</p>
              </div>
            </div>
          </div> */}
          <div className="ui-block col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div className="ui-item ui-red">
              <div className="left">
              <NotificationsIcon className="icon1" />
              </div>
              <div className="right">
                <h4>0</h4>
                <p>Notifications</p>
              </div>
            </div>
          </div>
          <div className="ui-block col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
            <div className="ui-item ui-yellow">
              <div className="left">
              <SmsOutlinedIcon className="icon2" />
              </div>
              <div className="right">
                <h4>0</h4>
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

        {/* <Grid
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
        </Grid> */}
      </Box>
      <ProfileBox
        name={auth.name}
        lastname={student.lastname}
        email={auth.email}
        department={auth.role}
        role={student.departmentName}
        profilephoto={skills.profilephoto}
      />
      <PlacementStatistics/>
    </div>
  );
}

export default StudentHomeBoxes;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import NotesIcon from "@mui/icons-material/Notes";
import "./TeacherHomeBoxes.css"; // Add your CSS class for styling
import { useAuth } from "../../../Context/AuthContext";
import ProfileBox from "../../ProfileBox/ProfileBox";
import axios from "axios";

function TeacherHomeBoxes() {
  const { auth, setAuth } = useAuth();
  const [teacher, setTeacher] = useState("");
  const [skillDetails, setSkillDetails] = useState(null);

  useEffect(() => {
    // Fetch both teacher data and department name
    axios
      .get(
        `http://localhost:5000/get-user-byid/get-user-byid/get-user-byid/${auth._id}`
      )
      .then((response) => {
        setTeacher({
          ...response.data,
        });

        return axios.get(
          `http://localhost:5000/get-department-name/get-department-name/get-department-name/${response.data.departmentId}`
        );
      })
      .then((response) => {
        console.log(response.data);

        setTeacher((prevData) => ({
          ...prevData,
          ...response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      

    
  }, [auth._id]);
  console.log(teacher);

  useEffect(() => {
    // Replace "user@example.com" with the actual user's email or get it from your authentication context
    const userEmail = "user@example.com";

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
    <div
      className=""
      style={{
        backgroundColor: "#f0ffff",
        padding: "20px 30px 0px",
        height: "130vh",
      }}
    >
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
                <h4>0</h4>
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
                {/* <h4>32</h4> */}
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
      <ProfileBox
        name={auth.name}
        lastname={teacher.lastname}
        email={auth.email}
        department={auth.role}
        role={teacher.departmentName}
      />
    </div>
  );
}

export default TeacherHomeBoxes;

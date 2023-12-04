import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../Context/AuthContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotesIcon from "@mui/icons-material/Notes";
import PersonIcon from "@mui/icons-material/Person";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import "./StudentHomeBoxes.css";
import ProfileUpdateMessage from "./ProfileUpdateMessage";
import PlacementStatistics from "../../Charts/PlacementStatistics";
import ProfileBox from "../../ProfileBox/ProfileBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

function StudentHomeBoxes() {
  const { auth } = useAuth();
  const [student, setStudent] = useState("");
  const [skills, setSkillDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [notification, setNotifications] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

    axios
      .get(
        `http://localhost:5000/get-skills-details/get-skills-details/get-skills-details/${auth.email}`
      )
      .then((response) => {
        setSkillDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching skill details:", error);
      });

    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        // Replace with your actual API endpoint
        `http://localhost:5000/send-notification/received-notifications/${auth.email}`
      );
      setNotifications(response.data.length);

      const notesResponse = await axios.get("http://localhost:5000/get-pdfs");
      setNotes(notesResponse.data.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleClick = () => {
    // Redirect to "/stud-update-profile" when the component is clicked
    navigate("/stud-update-profile");
  };

  return (
    <div
      className="h-300"
      style={{ backgroundColor: "#f0ffff", padding: "20px 30px 0px" }}
    >
      {/* <ProfileUpdateMessage /> */}
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
          Welcome,{auth.name}!!!
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
                <h4>{notification}</h4>
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
          <div
            className="ui-block col-xl-3 col-lg-4 col-md-6 col-sm-12"
            onClick={handleClick}
          >
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
                <h4>{notes}</h4>
                <p>Notes</p>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Box sx={{ backgroundColor: "", display: "flex" }}>
        <ProfileBox
          name={auth.name}
          lastname={student.lastname}
          email={auth.email}
          department={auth.role}
          role={student.departmentName}
          profilephoto={skills.profilephoto}
        />
        {/* <PlacementStatistics /> */}
      </Box>
    </div>
  );
}

export default StudentHomeBoxes;

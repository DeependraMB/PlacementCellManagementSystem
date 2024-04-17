import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../Context/AuthContext";
import { Avatar, Card, Stack } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import CheckIcon from "@mui/icons-material/Check";
import NoteIcon from "@mui/icons-material/Note";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminHomeBoxes() {
  const { auth, setAuth } = useAuth();
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [placedStudentsCount, setPlacedStudentsCount] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-students/get-students")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const count = response.data.length;
          setStudentCount(count);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });

    axios
      .get("http://localhost:5000/get-teachers/get-teachers")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const count = response.data.length;
          setTeacherCount(count);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });

    axios
      .get("http://localhost:5000/get-pdfs")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const count = response.data.length;
          setTotalNotes(count);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const handleClickOnAddTeacher = () => {
    navigate("/add-teacher");
  };

  const handleClickOnStudentManagement = () => {
    navigate("/student-management");
  };

  return (
    <div>
      <div className="row m-5">
        <div className="col-lg-3 col-sm-6">
          <div className="card bg-primary text-high-emphasis-inverse mb-4">
            <div className="card-body pb-0 d-flex justify-content-between">
              <div className="text-center">
                {" "}
                <div
                  className="fs-3 fw-semibold"
                  style={{ paddingTop: "40px", color: "white" }}
                >
                  {studentCount}
                  <span className="fs-6 fw-normal"></span>
                </div>
                <div className=""  style={{color : "white"}}>Students</div>
              </div>
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: "primary.dark",
                  color: "primary.contrastText",
                  width: 56,
                  height: 56,
                }}
              >
                <PeopleIcon fontSize="large" />
              </Avatar>
            </div>
            <div className="chart-wrapper mt-3 mx-3" style={{ height: 70 }}>
              <canvas
                data-testid="canvas"
                height={119}
                role="img"
                width={312}
                style={{
                  height: "69.5906px",
                  display: "block",
                  boxSizing: "border-box",
                  width: "182.456px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="card bg-info text-high-emphasis-inverse mb-4">
            <div className="card-body pb-0 d-flex justify-content-between align-items-start justify-content-center">
              <div className="text-center">
                <div
                  className="fs-3 fw-semibold"
                  style={{ paddingTop: "40px" }}
                >
                  {teacherCount}
                  <span className="fs-6 fw-normal"></span>
                </div>
                <div>Teachers</div>
              </div>
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: "primary.light",
                  color: "black",
                  width: 56,
                  height: 56,
                }}
              >
                <SchoolIcon fontSize="large" />
              </Avatar>
            </div>
            <div className="chart-wrapper mt-3 mx-3" style={{ height: 70 }}>
              <canvas
                data-testid="canvas"
                height={119}
                role="img"
                width={312}
                style={{
                  height: "70px", // Adjusted height to match the wrapper height
                  display: "block",
                  boxSizing: "border-box",
                  width: "100%", // Adjusted width to fill the container
                }}
              />
              <div
                className="chartjs-tooltip"
                style={{ opacity: 0, left: 21, top: "141.801px" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="card bg-warning text-high-emphasis-inverse mb-4">
            <div className="card-body pb-0 d-flex justify-content-between align-items-start justify-content-center">
              <div className="text-center">
                {" "}
                {/* Center text */}
                <div
                  className="fs-3 fw-semibold"
                  style={{ paddingTop: "40px" }}
                >
                  {placedStudentsCount}
                  <span className="fs-6 fw-normal"></span>
                </div>
                <div>Placed Students</div>
              </div>
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: "warning.light",
                  color: "dark.contrastText",
                  width: 56,
                  height: 56,
                }}
              >
                <CheckIcon fontSize="large" />
              </Avatar>
            </div>
            <div className="chart-wrapper mt-3" style={{ height: 70 }}>
              <canvas
                data-testid="canvas"
                height={119}
                role="img"
                width={367}
                style={{
                  height: "69.5906px",
                  display: "block",
                  boxSizing: "border-box",
                  width: "214.62px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="card bg-danger text-high-emphasis-inverse mb-4">
            <div className="card-body pb-0 d-flex justify-content-between align-items-start justify-content-center">
              <div className="text-center">
                {" "}
                <div
                  className="fs-4 fw-semibold"
                  style={{ paddingTop: "40px" }}
                >
                  {totalNotes}
                  <span className="fs-6 fw-normal"></span>
                </div>
                <div>Total Notes</div>
              </div>
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: "error.light",
                  color: "black",
                  width: 56,
                  height: 56,
                }}
              >
                <NoteIcon fontSize="large" />
              </Avatar>
            </div>
            <div className="chart-wrapper mt-3 mx-3" style={{ height: 70 }}>
              <canvas
                data-testid="canvas"
                height={119}
                role="img"
                width={312}
                style={{
                  height: "69.5906px",
                  display: "block",
                  boxSizing: "border-box",
                  width: "182.456px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Grid container spacing={3} justifyContent="center">
        <Grid xs={12} sm={5} item>
          <Card
            component={Stack}
            direction="row"
            sx={{
              px: 3,
              py: 5,
              borderRadius: 2,
            }}
            onClick={handleClickOnAddTeacher}
          >
            <Stack spacing={0.5}>
              <Typography variant="h4"></Typography>

              <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
                Add Teacher
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid xs={12} sm={5} item>
          <Card
            component={Stack}
            direction="row"
            sx={{
              px: 3,
              py: 5,
              borderRadius: 2,
            }}
            onClick={handleClickOnStudentManagement}
          >
            <Stack spacing={0.5}>
              <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
                Student Management
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminHomeBoxes;

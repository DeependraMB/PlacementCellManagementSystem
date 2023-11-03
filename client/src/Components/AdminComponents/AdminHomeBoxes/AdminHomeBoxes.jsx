import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../Context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import CheckIcon from "@mui/icons-material/Check";
import NoteIcon from "@mui/icons-material/Note";

function AdminHomeBoxes() {
  const { auth, setAuth } = useAuth();
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [placedStudentsCount, setPlacedStudentsCount] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);

  // Fetch data from your project's backend or data source
  useEffect(() => {
    // Simulate fetching data (replace with actual API calls)
    setStudentCount(150);
    setTeacherCount(10);
    setPlacedStudentsCount(75);
    setTotalNotes(500);
  }, []);

  return (
    <div>
      <div className="row m-5">
        <div className="col-lg-3 col-sm-6">
          <div className="card bg-primary text-high-emphasis-inverse mb-4">
            <div className="card-body pb-0 d-flex justify-content-between">
              <div className="text-center"> {/* Center text */}
                <div className="fs-3 fw-semibold" style={{paddingTop:"40px"}}>
                  {studentCount}
                  <span className="fs-6 fw-normal"></span>
                </div>
                <div className="">Students</div>
              </div>
              <PeopleIcon fontSize="large" /> {/* Increase icon size */}
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
              <div className="text-center"> {/* Center text */}
                <div className="fs-3 fw-semibold" style={{paddingTop:"40px"}}>
                  {teacherCount}
                  <span className="fs-6 fw-normal"></span>
                </div>
                <div>Teachers</div>
              </div>
              <SchoolIcon fontSize="large" /> {/* Increase icon size */}
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
              <div className="text-center"> {/* Center text */}
                <div className="fs-3 fw-semibold" style={{paddingTop:"40px"}}>
                  {placedStudentsCount}
                  <span className="fs-6 fw-normal"></span>
                </div>
                <div>Placed Students</div>
              </div>
              <CheckIcon fontSize="large" /> {/* Increase icon size */}
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
              <div className="text-center"> {/* Center text */}
                <div className="fs-4 fw-semibold" style={{paddingTop:"40px"}}>
                  {totalNotes}
                  <span className="fs-6 fw-normal" ></span>
                </div>
                <div>Total Notes</div>
              </div>
              <NoteIcon fontSize="large" /> {/* Increase icon size */}
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
    </div>
  );
}

export default AdminHomeBoxes;

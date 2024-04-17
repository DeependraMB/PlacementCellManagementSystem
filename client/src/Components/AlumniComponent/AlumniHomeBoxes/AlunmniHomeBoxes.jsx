import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { NavLink } from "react-router-dom";

function AlumniHomeBoxes() {
  const { auth } = useAuth();
  const [totalJobs, setTotalJobs] = useState(null);
  const [allJobs, setAllJobs] = useState(null);
  const [totalNotes,setTotalNotes] = useState(null);

  const email = auth.emai;

  console.log(totalJobs)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/alumni/get-job-by-Id',
            email
        );
        
        setTotalJobs(response.data.job.length); 
      } catch (error) {
        console.error("Error fetching total jobs:", error);
      }
    };

    fetchData();

    const alljobs = axios.get('http://localhost:5000/alumni/get-job').then((res)=>{
    
      setAllJobs(res.data.jobs.length);
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


  }, [auth.email]);

  return (
    <div className="m-3">
      <div className="row mt-4 mt-lg-5 align-items-center" style={{ marginLeft: "10px" }}>
        <div className="col-sm-6 col-xxl-3">
          <Paper className="pxp-dashboard-stats-card bg-primary bg-opacity-10 mb-3 mb-xxl-0" elevation={3} style={{ padding: "10px", margin: "" }}>
            <div style={{ float: "left", paddingLeft: "10px", paddingTop: "10px" }}>
              <div className="pxp-dashboard-stats-card-icon-container" style={{ fontSize: "0px" }}>
                <EngineeringIcon />
              </div>
            </div>
            <div className="pxp-dashboard-stats-card-info p-3">
              <div className="pxp-dashboard-stats-card-info-number" style={{fontWeight: "bolder"}}>{totalJobs}</div>
              <div className="pxp-dashboard-stats-card-info-text pxp-text-light" style={{fontWeight: "bolder"}}>
                Job Shared
              </div>
            </div>
          </Paper>
        </div>
        <div className="col-sm-6 col-xxl-3">
          <Paper className="pxp-dashboard-stats-card bg-success bg-opacity-10 mb-3 mb-xxl-0" elevation={3} style={{ padding: "10px", margin: "" }}>
            <div className="pxp-dashboard-stats-card-icon text-success">
              <span className="fa fa-briefcase"></span>
            </div>
            <div className="pxp-dashboard-stats-card-info p-3">
              <div className="pxp-dashboard-stats-card-info-number" style={{fontWeight: "bolder"}}>{allJobs}</div>
              <div className="pxp-dashboard-stats-card-info-text pxp-text-light" style={{fontWeight: "bolder"}}>
                Total Jobs
              </div>
            </div>
          </Paper>
        </div>

        <div className="col-sm-6 col-xxl-3">
        <NavLink to="/alumni-chat-room" className="nav-link">
          <Paper className="pxp-dashboard-stats-card bg-warning bg-opacity-10 mb-3 mb-xxl-0" elevation={3} style={{ padding: "10px", margin: "" }}>
            <div className="pxp-dashboard-stats-card-icon text-warning">
              <span className="fa fa-user"></span>
            </div>
            <div className="pxp-dashboard-stats-card-info p-3">
              <div className="pxp-dashboard-stats-card-info-number" style={{fontWeight: "bolder"}}>Chat</div>
              <div className="pxp-dashboard-stats-card-info-text pxp-text-light" style={{fontWeight: "bolder"}}>
                Room
              </div>
            </div>
          </Paper>
        </NavLink>
        </div>


        <div className="col-sm-6 col-xxl-3">
          <Paper className="pxp-dashboard-stats-card bg-danger bg-opacity-10 mb-3 mb-xxl-0" elevation={3} style={{ padding: "10px", margin: "" }}>
            <div className="pxp-dashboard-stats-card-icon text-danger">
              <span className="fa fa-comments"></span>
            </div>
            <div className="pxp-dashboard-stats-card-info p-3">
              <div className="pxp-dashboard-stats-card-info-number" style={{fontWeight: "bolder"}}>{totalNotes}</div>
              <div className="pxp-dashboard-stats-card-info-text pxp-text-light" style={{fontWeight: "bolder"}}>
                Total Notes
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default AlumniHomeBoxes;

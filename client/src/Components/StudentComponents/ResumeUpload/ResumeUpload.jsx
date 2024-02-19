import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Button,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const ResumeUpload = () => {
  const [resume, setResume] = useState(null);
  const [atsResponse, setAtsResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!resume) {
        throw new Error("Please select a file to upload");
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("pdf", resume);

      const response = await axios.post(
        "http://localhost:5000/resume-ats-checker/resume-ats-checker",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setAtsResponse(response.data);
    } catch (error) {
      console.error("Error uploading resume:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="div"
      className="cv-manager-widget ls-widget"
      style={{ margin: "10px", height: "", fontFamily: "nunito" }}
    >
      {atsResponse ? (
        <div style={{ fontFamily: "nunito" }}>
          <h4 style={{fontWeight: "bolder"}}>Evaluation Result</h4>
          {atsResponse.data && (
            <>
              {JSON.parse(atsResponse.data).score && (
                <div>
                  <Typography variant="h5" sx={{fontWeight: "bolder"}}>
                    Score: {JSON.parse(atsResponse.data).score}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={JSON.parse(atsResponse.data).score} 
                    sx={{
                      marginTop: 1,
                      width: "50%",
                      height: "20px",
                      marginLeft: "320px",
                    }} 
                  />
                </div>
              )}

              {Array.isArray(JSON.parse(atsResponse.data).missing) && (
                <>
                  <Typography variant="h5" sx={{marginTop: "40px", marginRight: "900px",fontWeight: "bolder"}}>Missing Elements</Typography>
                  <List>
                    {JSON.parse(atsResponse.data).missing.map(
                      (element, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <FiberManualRecordIcon />
                          </ListItemIcon>
                          <ListItemText primary={element} />
                        </ListItem>
                      )
                    )}
                  </List>
                </>
              )}

              {Array.isArray(JSON.parse(atsResponse.data).add) && (
                <>
                  <Typography variant="h5" sx={{marginTop: "40px", marginRight: "800px", fontWeight: "bolder"}}>Recommended Additions</Typography>
                  <List>
                    {JSON.parse(atsResponse.data).add.map((addition, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <FiberManualRecordIcon />
                        </ListItemIcon>
                        <ListItemText primary={addition} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAtsResponse(null)}
          >
            Check Another Resume
          </Button>
        </div>
      ) : (
        <>
          <Box component="div" className="widget-title" p={2}>
            <h4>Upload Your Resume</h4>
          </Box>
          <Paper
            elevation={3}
            style={{
              height: "425px",
              marginBottom: "10px",
              margin: "10px 50px",
            }}
          >
            <Box
              component="div"
              className="widget-content"
              p={2}
              style={{
                backgroundColor: "",
                margin: "10px",
                paddingTop: "10px",
              }}
            >
              <div style={{ marginTop: "25px", paddingTop: "" }}>
                <Box
                  component="div"
                  className="uploading-resume"
                  style={{
                    margin: "10px",
                    paddingTop: "90px",
                    border: "3px dashed black",
                    paddingBottom: "135px",
                    borderRadius: "5px",
                  }}
                >
                  <form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <Box
                      component="div"
                      className="uploadButton"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      style={{ marginTop: "40px" }}
                    >
                      <input
                        className="uploadButton-input"
                        accept=".doc,.docx,application/msword,application/pdf,image/*"
                        id="upload"
                        type="file"
                        name="resume"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      <label
                        className="cv-uploadButton"
                        htmlFor="upload"
                        style={{ cursor: "pointer" }}
                      >
                        <span className="title">Drop files here to upload</span>
                        <span className="text">
                          To upload file size is (Max 5Mb) and allowed file
                          types are (.doc, .docx, .pdf)
                        </span>
                        <span className="theme-btn btn-style-one">
                          Upload Resume
                        </span>
                      </label>
                      <span className="uploadButton-file-name">
                        {resume ? resume.name : ""}
                      </span>
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      mt={2}
                    >
                      Submit
                    </Button>
                  </form>
                </Box>
              </div>
              <Box component="div" className="files-outer"></Box>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default ResumeUpload;

import React, { useState } from "react";
import axios from "axios";
import { Box, Paper, Button } from "@mui/material";

const ResumeUpload = () => {
  const [resume, setResume] = useState(null);

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

      const formData = {
        resume
      }

      const response = await axios.post(
        "http://localhost:5000/resume-ats-checker/resume-ats-checker",
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading resume:", error.message);
    }
  };

  return (
    <Box
      component="div"
      className="cv-manager-widget ls-widget"
      style={{ margin: "10px", height: "" }}
    >
      <Box component="div" className="widget-title" p={2}>
        <h4>Upload Your Resume</h4>
      </Box>
      <Paper
        elevation={3}
        style={{
          height: "400px",
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
              <form onSubmit={handleSubmit}>
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
                      To upload file size is (Max 5Mb) and allowed file types
                      are (.doc, .docx, .pdf)
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
    </Box>
  );
};

export default ResumeUpload;

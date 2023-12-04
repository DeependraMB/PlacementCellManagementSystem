import React, { useState } from "react";
import { TextField, Grid, Button, Divider } from "@mui/material";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const blueBorder = {
  borderBottom: "2px solid #2196F3", // Replace with your preferred blue color
};

function AddNotesForm({ onNext }) {
  const navigator = useNavigate();
  const { auth, setAuth } = useAuth();

  const [documentTitle, setDocumentTitle] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [documentFile, setDocumentFile] = useState(null);

  const [documentTitleError, setDocumentTitleError] = useState("");
  const [documentDescriptionError, setDocumentDescriptionError] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateDocumentTitle = (value) => {
    if (!value) {
      setDocumentTitleError("Document title is required");
    } else {
      setDocumentTitleError("");
    }
  };

  const validateDocumentDescription = (value) => {
    if (!value) {
      setDocumentDescriptionError("Document description is required");
    } else {
      setDocumentDescriptionError("");
    }
  };

  const validateForm = () => {
    setIsFormValid(!documentTitleError && !documentDescriptionError);
  };

  const handleFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const formData = {
    title: documentTitle,
    description: documentDescription,
    file: documentFile,
    email: auth.email,
    author: auth.name,
  };
  console.log(formData);

  async function onSubmit(event) {
    event.preventDefault();

    validateDocumentTitle(documentTitle);
    validateDocumentDescription(documentDescription);

    validateForm();

    if (formSubmitted) {
      return;
    }

    if (isFormValid) {
      try {
        const res = await axios.post(
          "http://localhost:5000/notesshare/notesshare",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFormSubmitted(true);
        navigator("/notes-share");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            name="documentTitle"
            label="Document Title"
            color="primary"
            fullWidth
            value={documentTitle}
            onChange={(e) => {
              setDocumentTitle(e.target.value);
              validateDocumentTitle(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            autoFocus
            error={!!documentTitleError}
            helperText={documentTitleError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="documentDescription"
            label="Document Description"
            fullWidth
            value={documentDescription}
            onChange={(e) => {
              setDocumentDescription(e.target.value);
              validateDocumentDescription(e.target.value);
            }}
            InputProps={{ style: blueBorder }}
            error={!!documentDescriptionError}
            helperText={documentDescriptionError}
          />
        </Grid>
        <Grid item xs={12}>
          <input type="file" name="documentFile" onChange={handleFileChange} />
        </Grid>
      </Grid>
      <Divider />
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Button
          name="uploadButton"
          variant="contained"
          color="primary"
          style={{ paddingLeft: "40px", paddingRight: "40px" }}
          type="submit"
          disabled={formSubmitted}
        >
          Upload Document
        </Button>
      </div>
    </form>
  );
}

export default AddNotesForm;

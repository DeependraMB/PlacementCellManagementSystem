import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext"; // Import your authentication context

function DeclarationForm({ onBack, formData }) {
  const [viewProfile, setViewProfile] = useState(false);
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const { auth } = useAuth(); // Access the user's email from the authentication context

  const generatePdf = () => {
    if (!declarationChecked) {
      alert("Please check the declaration box before proceeding.");
      return;
    }

    // Make a GET request to the /generate-userdata-pdf/:email endpoint
    axios
      .get(`http://localhost:5000/generate-userdata-pdf/generate-userdata-pdf/${auth.email}`, {
        responseType: "blob",
      })
      .then((response) => {
        // Create a blob from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a link to download the PDF
        const a = document.createElement("a");
        a.href = url;
        a.download = "profile.pdf";

        // Trigger a click event to download the PDF
        a.click();
      });
  };

  return (
    <form style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}>
      <div>
        <p>
          I hereby declare that the information provided in this form is true and accurate
          to the best of my knowledge.
        </p>
        <label>
          <input
            type="checkbox"
            checked={declarationChecked}
            onChange={() => setDeclarationChecked(!declarationChecked)}
          />
          I acknowledge and agree to the declaration above.
        </label>
        <br></br>
        <Button
          className="my-5"
          variant="contained"
          color="primary"
          style={{ paddingLeft: "40px", paddingRight: "40px" }}
          onClick={() => {
            setViewProfile(true);
            generatePdf();
          }}
        >
          View Profile
        </Button>
        <div>
          <Button
            variant="outlined"
            style={{ paddingLeft: "40px", paddingRight: "40px" }}
            onClick={onBack}
          >
            Back
          </Button>
        </div>
      </div>
    </form>
  );
}

export default DeclarationForm;

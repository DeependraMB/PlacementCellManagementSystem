import React, { useState } from "react";
import { Button } from "@mui/material";

function DeclarationForm({ data, setData, onNext, onBack, studentData }) {
  const [viewProfile, setViewProfile] = useState(false);

  const handleViewProfile = () => {
    setViewProfile(true);
  };

  return (
    <form style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}>
      {viewProfile ? (
        // Render the PDF viewer if viewProfile is true
        <h5>Deependra</h5>
      ) : (
        <div>
          {/* Your form fields and other content here */}
          {/* For example: */}
          <input
            type="text"
            name="declaration"
            label="Declaration"
            placeholder="Enter your declaration"
            value={data.declaration}
            onChange={(e) => setData({ ...data, declaration: e.target.value })}
          />
          {/* Add more form fields as needed */}
          
          {/* Button to view the profile and generate PDF */}
          <Button
            variant="contained"
            color="primary"
            style={{ paddingLeft: "40px", paddingRight: "40px" }}
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
        </div>
      )}
    </form>
  );
}

export default DeclarationForm;

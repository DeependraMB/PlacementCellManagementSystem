import React, { useState } from "react";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function DeclarationForm({ data, setData, onNext, onBack, studentData, formData }) {
  const [viewProfile, setViewProfile] = useState(false);

  console.log(formData, 'formdddddddddddddddddddddddddddata')

  const handleViewProfile = () => {
    setViewProfile(true);
    generatePDF();
  };

  const generatePDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF("p", "mm", "a4");

    // Reference to the HTML element you want to capture in the PDF
    const pdfContainer = document.getElementById("pdf-container");

    // Use html2canvas to capture the HTML element
    html2canvas(pdfContainer).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);

      // Populate the PDF with data from formData
      // For example, you can add the name and other details to the PDF
      pdf.text(`Name: ${studentData.skills.projects}`, 10, 100);
      // Add more data as needed

      // Save the PDF with a file name
      pdf.save("profile.pdf");
    });
  };

  return (
    <form style={{ marginLeft: "80px", marginRight: "80px", marginTop: "50px" }}>
      {viewProfile ? (
        <div id="pdf-container">
          {/* Content you want to capture in the PDF */}
          <h5>{studentData.skills.technicalskills}</h5>
          {/* Add more data from your APIs here */}
        </div>
      ) : (
        <div>
          
          <Button
            variant="contained"
            color="primary"
            style={{ paddingLeft: "40px", paddingRight: "40px" }}
            onClick={handleViewProfile}
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
        
        
      )}
    </form>
  );
}

export default DeclarationForm;

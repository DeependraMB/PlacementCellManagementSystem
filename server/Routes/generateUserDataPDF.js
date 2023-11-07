const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const Personal = require("../Models/studentDetailsModel");
const User = require("../Models/userModel");
const Skills = require("../Models/skillsModel");
const Education = require("../Models/educationModel");
const fs = require("fs");

router.get("/generate-userdata-pdf/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const studentDetails = await Personal.findOne({ email: email });
    const user = await User.findOne({ email: email });
    const skills = await Skills.findOne({ email: email });
    const education = await Education.findOne({ email: email });

    if (!studentDetails || !user || !skills || !education) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=student_profile.pdf"
    );

    // Pipe the PDF content to the response
    doc.pipe(res);

    function addPageBorder() {
      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
      const borderWidth = 20; // Adjust the width of the border as needed
      doc.lineWidth(1); // Set the line width for the outer border
      doc.rect(0, 0, pageWidth, pageHeight).stroke();

      // Draw an inner border to create a double-layered effect
      const innerBorderWidth = borderWidth * 2; // Adjust the inner border width
      doc
        .rect(
          borderWidth, // X position
          borderWidth, // Y position
          pageWidth - innerBorderWidth, // Width
          pageHeight - innerBorderWidth // Height
        )
        .stroke();
    }

    // Function to add a new page with borders
    function addPageWithBorder() {
      doc.addPage();
      addPageBorder();
    }


    addPageBorder();
    // Customize the appearance
    doc.font("Helvetica-Bold");
    doc.fontSize(20);
    doc.text("Student Personal Details", { align: "center" });
    doc.moveDown(); // Move down a line

    // Add the student's personal details to the PDF
    doc.font("Helvetica");
    doc.fontSize(16);


    doc.text(`First Name: ${user.firstname}`);
    doc.text(`Last Name: ${user.lastname}`);
    doc.text(`Gender: ${user.gender}`);
    doc.text(`Mobile Number: ${user.mobno}`);
    doc.text(`Department ID: ${user.departmentId}`);
    doc.text(`Batch: ${user.batch}`);
    doc.text(`Graduation Year: ${user.graduationYear}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Role: ${user.role}`);
    doc.text(`Date of Birth: ${studentDetails.dob}`);
    doc.text(`Personal Email: ${studentDetails.personalemail}`);
    doc.text(`Email: ${studentDetails.email}`);
    doc.text(`Father's Name: ${studentDetails.fathername}`);
    doc.text(`Mother's Name: ${studentDetails.mothername}`);
    doc.text(`House Name: ${studentDetails.housename}`);
    doc.text(`Post Office: ${studentDetails.postoffice}`);
    doc.text(`City: ${studentDetails.city}`);
    doc.text(`State: ${studentDetails.state}`);
    doc.text(`Pincode: ${studentDetails.pincode}`);
    doc.text(`Nationality: ${studentDetails.nationality}`);

    doc.moveDown();
    doc.font("Helvetica-Bold");
    doc.fontSize(20);
    doc.text("Student Education Details", { align: "center" });
    doc.moveDown(); // Move down a line

    doc.font("Helvetica");
    doc.fontSize(16);

    doc.text(`10th Percentage: ${education.tenthpercentage}`);
    doc.text(`10th CGPA: ${education.tenthCGPA}`);
    doc.text(`10th Board: ${education.tenthboard}`);
    doc.text(`10th School Name: ${education.tenthschoolname}`);
    doc.text(`12th Percentage: ${education.twelthpercentage}`);
    doc.text(`12th CGPA: ${education.twelthCGPA}`);
    doc.text(`12th Board: ${education.twelthboard}`);
    doc.text(`12th School Name: ${education.twelthschoolname}`);
    addPageWithBorder();
    doc.text(`UG Course Name: ${education.ugcoursename}`);
    doc.text(`UG Percentage: ${education.ugpercentage}`);
    doc.text(`UG CGPA: ${education.ugCGPA}`);
    doc.text(`UG Year of Graduation: ${education.ugyearofgraduation}`);
    doc.text(`UG College Name: ${education.ugcollegename}`);
    doc.text(`UG University: ${education.uguniversity}`);
    doc.text(`MCA Aggregate CGPA: ${education.mcaaggregateCGPA}`);
    doc.text(`Active Arrears: ${education.activearrears}`);
    doc.text(`History of Arrears: ${education.historyofarrears}`);

    doc.font("Helvetica-Bold");
    doc.fontSize(20);
    doc.text("Skills Details", { align: "center" });
    doc.moveDown(); // Move down a line

    // Add the student's skills details to the PDF
    doc.font("Helvetica");
    doc.fontSize(16);

    doc.text(`Technical Skills: ${skills.technicalskills}`);
    doc.text(`Projects: ${skills.projects}`);
    doc.text(`GitHub Link: ${skills.githublink}`);
    doc.text(`LinkedIn Link: ${skills.linkedinlink}`);
    doc.text(`Languages Known: ${skills.languagesknown}`);
    doc.text(`Profile Photo: ${skills.profilephoto}`);
    doc.text(`Resume: ${skills.resume}`);

    // Embed the profile photo if it exists
    if (skills.profilephoto) {
      // Check if the image path exists
      const profilePhotoPath = `uploads/${skills.profilephoto}`; // Assuming the image path is relative to your server
      if (fs.existsSync(profilePhotoPath)) {
        doc.moveDown();
        doc.image(profilePhotoPath, {
          fit: [200, 200], // You can adjust the width and height as needed
          align: "center",
        });
      } else {
        doc.text("Profile Photo Not Found"); // Display this if the image path does not exist
      }
    }



    // End the document and send it as a response
    doc.end();
  } catch (error) {
    console.error("Error in /generate-userdata-pdf route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

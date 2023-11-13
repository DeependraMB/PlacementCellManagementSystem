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

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=student_profile.pdf"
    );

    doc.pipe(res);

    function addPageBorder() {
      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
      const borderWidth = 20; 
      doc.lineWidth(1); 
      doc.rect(0, 0, pageWidth, pageHeight).stroke();

      const innerBorderWidth = borderWidth * 2; 
      doc
        .rect(
          borderWidth, 
          borderWidth, 
          pageWidth - innerBorderWidth, 
          pageHeight - innerBorderWidth 
        )
        .stroke();
    }

    function addPageWithBorder() {
      doc.addPage();
      addPageBorder();
    }

    // addPageBorder();

    // if (skills.profilephoto) {
    //   // Check if the image path exists
    //   const profilePhotoPath = `uploads/${skills.profilephoto}`;

    //   if (fs.existsSync(profilePhotoPath)) {
    //     // Get the width and height of the image
    //     const imgWidth = 200; // You can adjust the width as needed
    //     const imgHeight = 200; // You can adjust the height as needed

    //     // Calculate the X and Y coordinates to position the image in the top right corner
    //     const pageWidth = doc.page.width;
    //     const x = pageWidth - imgWidth - 25;
    //     const y = 25;

    //     doc.image(profilePhotoPath, x, y, {
    //       fit: [imgWidth, imgHeight],
    //       align: "right", // Align the image to the right
    //     });
    //   } else {
    //     doc.text("Profile Photo Not Found");
    //   }
    // }
    // Customize the appearance
    // ... (previous code)

    doc.font("Times-Bold");
    doc.fontSize(40);
    const name = `${user.firstname} ${user.lastname}`;

    const textWidth = doc.widthOfString(name);
    const underlineY = doc.y + 35;
    const underlineStartX = (doc.page.width - textWidth) / 2;

    doc.underline(underlineStartX, underlineY, textWidth, 5); 
    doc.text(name, { align: "center" });

    const nextLineY = underlineY + 20;
    doc.y = nextLineY;

    doc.font("Times-Roman");
    doc.fontSize(14);
    const personalDetails = [
      `${user.mobno} || ${user.email}`,
      `${studentDetails.housename}, ${studentDetails.postoffice}, ${studentDetails.city}, ${studentDetails.pincode}`,
    ];

    personalDetails.forEach((detail) => {
      doc.text(detail, { lineGap: 5, align: "center" });
    });

    doc.moveDown(2);

    doc.font("Times-Bold");
    doc.fontSize(15);
    doc.text("Education", { align: "start" });

    const underlineLength = 550;
    doc.moveDown(0.1);
    doc.dash(1, { space: 0.5 });
    doc
      .lineCap("butt")
      .moveTo(50, doc.y)
      .lineTo(10 + underlineLength, doc.y)
      .stroke();
    doc.undash();

    doc.moveDown(0.3);

    doc.font("Times-Roman");
    doc.fontSize(12);

    const educationDetails = [
      {
        text: `${education.ugcollegename} (${education.ugyearofgraduation})`,
        bold: true,
      },
      { text: `Course: ${education.ugcoursename}` },
      {
        text: `Percentage: ${education.ugpercentage}         CGPA: ${education.ugCGPA}`,
      },
      { text: `${education.twelthschoolname}`, bold: true },
      { text: `Higher Secondary Education` },
      {
        text: `Percentage: ${education.twelthpercentage}      CGPA: ${education.twelthCGPA}`,
      },
      { text: `${education.tenthschoolname}`, bold: true },
      { text: `Secondary School Education` },
      {
        text: `Percentage: ${education.tenthpercentage}        CGPA: ${education.tenthCGPA}`,
      },
    ];

    educationDetails.forEach((detail) => {
      if (detail.bold) {
        doc.font("Times-Bold").text(detail.text, { lineGap: 5 });
      } else {
        doc.font("Times-Roman").text(detail.text, { lineGap: 5, fontSize: 10 });
      }
    });

    doc.moveDown(2);

    doc.font("Times-Bold");
    doc.fontSize(15);
    doc.text("Skills", { align: "start" });

    const skillsUnderlineLength = 550;
    doc.moveDown(0.1);
    doc.dash(1, { space: 0.5 });
    doc
      .lineCap("butt")
      .moveTo(50, doc.y)
      .lineTo(10 + skillsUnderlineLength, doc.y)
      .stroke();
    doc.undash();

    doc.moveDown(0.5);

    doc.font("Times-Roman");
    doc.fontSize(12);

    const skillsDetails = [
      { text: `Technical Skills: ${skills.technicalskills}` },
      { text: `Projects: ${skills.projects}` },
      { text: `GitHub Link: ${skills.githublink}` },
      { text: `LinkedIn Link: ${skills.linkedinlink}` },
      { text: `Language Known: ${skills.languagesknown}`}
    ];

    skillsDetails.forEach((detail) => {
      doc.text(detail.text, { lineGap: 5 });
    });

    doc.moveDown(1.5);

    doc.font("Times-Bold");
    doc.fontSize(15);
    doc.text("Personal Information", { align: "start" });

    const personalInfoUnderlineLength = 550;
    doc.moveDown(0.1);
    doc.dash(1, { space: 0.5 });
    doc
      .lineCap("butt")
      .moveTo(50, doc.y)
      .lineTo(10 + personalInfoUnderlineLength, doc.y)
      .stroke();
    doc.undash();

    doc.moveDown(0.5);

    doc.font("Times-Roman");
    doc.fontSize(12);

    const personalInfoDetails = [
      {
        text: `Address: ${studentDetails.housename}, ${studentDetails.postoffice}, ${studentDetails.city}, ${studentDetails.pincode}`,
      },
      { text: `Mobile Number: ${user.mobno}` },
      { text: `Gender: ${user.gender}` },
      { text: `Date of Birth: ${studentDetails.dob}` },
      { text: `Nationality: ${studentDetails.nationality}` },
      { text: `Father's Name: ${studentDetails.fathername}` },
      { text: `Mother's Name: ${studentDetails.mothername}` },
    ];

    personalInfoDetails.forEach((detail) => {
      doc.text(detail.text, { lineGap: 5 });
    });

    doc.end();
  } catch (error) {
    console.error("Error in /generate-userdata-pdf route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;


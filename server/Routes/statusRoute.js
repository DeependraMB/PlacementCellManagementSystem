// Import necessary modules
const express = require("express");
const nodemailer = require("nodemailer");
const User = require("../Models/userModel");
const router = express.Router();

const emailUser = "campusnexa@gmail.com";
const emailPassword = "jvcs eswe akkc gsqn";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

router.post("/update-student-status", async (req, res) => {
  const { email, newStatus } = req.body;

  try {
    if (!["Active", "Placed", "Blocked"].includes(newStatus)) {
      return res.status(400).json({ error: "Invalid status provided" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { status: newStatus } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "Placement Cell Management System - Status Update",
      html: `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .container-a {
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffff;
            
          }
          .header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            
            text-align: center;
          }
          h2 {
            color: #333;
            margin-bottom: 10px;
          }
          p {
            color: #666;
            margin-bottom: 20px;
          }
          .footer {
            background-color: #333;
            color: #fff;
            padding: 10px;
            border-radius: 0 0 10px 10px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Placement Cell</h1>
        </div>
        <div class="container-a">
          <h2>Placement Cell Management System</h2>
          <p>Your status has been updated to <strong>${newStatus}</strong>.</p>
          <p>
            This email is to inform you about the recent status update in the Placement Cell Management System. If you have any questions or need further assistance, please don't hesitate to contact us.
          </p>
        </div>
        <div class="footer">
          <p>Amal Jyothi College of Engineering, Kanjirappally</p>
          <p>For further assistance, please contact the Placement Cell.</p>
        </div>
      </body>
    </html>
    
      `,
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Notification email sent:", info.response);
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

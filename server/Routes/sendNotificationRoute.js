const express = require("express");
const nodemailer = require("nodemailer");
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

 
  router.post("/send-notification", async (req, res) => {
    console.log("Mundalil");

    // const emailsJSON = req.body.emails;
  
    // const emails = JSON.parse(emailsJSON);

    const emailData = req.body;
    console.log(emailData);
    const emailAddresses = emailData.email;
    console.log(emailAddresses);
    const {subject,message} =req.body;
    
    console.log("Subject:", subject);
console.log("Message:", message);
  
    try {
      // Loop through the email addresses and send notifications
      for (const email of emailAddresses) {
        const mailOptions = {
          from: emailUser,
          to: email,
          subject: subject,
          html: message,
        };
  
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }
  
      res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  



  


module.exports = router;

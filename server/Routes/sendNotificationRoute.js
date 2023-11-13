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
          html: `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Nunito', sans-serif;
                  background-color: #f4f4f4;
                }
                .email-container {
                  max-width: 600px;
                  margin: auto;
                  padding: 20px;
                  background-color: #ebeae8;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .greeting {
                  font-size: 18px;
                  color: #333;
                  margin-bottom: 15px;
                }
                .message {
                  font-size: 16px;
                  color: #555;
                  line-height: 1.5;
                }
                .signature {
                  font-size: 14px;
                  color: #888;
                  margin-top: 20px;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <p class="greeting">Greetings from Your Organization!</p>
                <p class="message">${message}</p>
                <p class="message">Thank you for your attention.</p>
                <!-- Add more content here as needed -->
                <p class="signature">Best Regards,<br>Your Name</p>
              </div>
            </body>
          </html>
        `,
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

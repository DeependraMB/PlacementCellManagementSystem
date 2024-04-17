// Import necessary modules
const express = require('express');
const nodemailer = require('nodemailer');
const Notification = require('../Models/notificationModel');
const router = express.Router();


router.get('/received-notifications/:studentEmail', async (req, res) => {
  try {
    // Fetch unread notifications for the student
    const notifications = await Notification.find({
      recipientEmail: req.params.studentEmail
     
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch notifications for a specific student
router.get('/receive-notifications/:studentEmail', async (req, res) => {
  try {
    // Fetch unread notifications for the student
    const notifications = await Notification.find({
      recipientEmail: req.params.studentEmail,
      isRead: false,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to mark a notification as read
router.put('/notifications/:notificationId', async (req, res) => {
  try {
    // Find the notification by ID and mark it as read
    await Notification.findByIdAndUpdate(req.params.notificationId, { isRead: true });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to send notifications
router.post('/send-notification', async (req, res) => {
  const emailUser = 'campusnexa@gmail.com';
  const emailPassword = 'jvcs eswe akkc gsqn';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  console.log('Mundalil');

  const emailData = req.body;
  console.log(emailData);
  const emailAddresses = emailData.email;
  console.log(emailAddresses);
  const { subject, message } = req.body;

  console.log('Subject:', subject);
  console.log('Message:', message);

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
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      // Save the notification to MongoDB
      await Notification.create({
        recipientEmail: email,
        subject,
        message,
        // Add other fields as needed
      });
    }

    // Send the response after all emails are sent and notifications are saved
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-all-notifications', async(req, res) => {
  try {
    data = await Notification.find();
    res.status(200).json({data});
  } catch (error) {
      console.log("Error in the /get-all-notifications", error)
  }
})

module.exports = router;

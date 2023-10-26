const nodemailer = require("nodemailer");
const User = require("../Models/userModel");
const crypto = require("crypto");
const OTP = require("../Models/otpModel");


const emailUser = "campusnexa@gmail.com";
const emailPassword = "jvcs eswe akkc gsqn";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});



// Generate and send OTP
exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  console.log(email);


 
    // Check if an OTP already exists for this email
    const existingOTP = await OTP.findOne({ email });

    if (existingOTP) {
      return res
        .status(400)
        .json({ success: false, message: "OTP already sent for this email" });
    }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(otp);

  await OTP.create({ email, otp });
  
  const mailOptions = {
    from: emailUser,
    to: email,
    subject: "OTP Verification",
    html: `
      <html>
        <body>
          <h3>OTP Verification</h3>
  
          <p>Dear User,</p>
  
          <p>Your OTP for SignUp is: <strong>${otp}</strong></p>
  
          <p>Please use this OTP to complete the SignUp process.</p>
  
          <p>Thank you!</p>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("OTP email sent:", info.response);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });
  });

};

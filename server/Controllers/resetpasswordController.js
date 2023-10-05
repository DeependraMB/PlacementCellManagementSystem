const nodemailer = require("nodemailer");
const User = require("../Models/userModel");
const crypto = require("crypto");
const { hashPassword } = require("../Helpers/registerHelper");

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
  
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(otp)
  // Store the OTP in the user's record (in a production app, you'd use a database)
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found!!!",
      });
    }
    user.otp = otp;
    await user.save();
  } catch (error) {
    console.error("Error saving OTP:", error);
    return res.status(500).json({ 
      error: "Internal Server Error" });
  }




  // Send the OTP via email
// Create the email
const mailOptions = {
  from: emailUser,
  to: email,
  subject: "OTP Verification",
  html: `
    <html>
      <body>
        <h3>OTP Verification</h3>

        <p>Dear User,</p>

        <p>Your OTP for password reset is: <strong>${otp}</strong></p>

        <p>Please use this OTP to complete the password reset process.</p>

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
      message: "OTP sent successfully." });
  });
};

// Verify OTP and reset password
exports.verifyOTPAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  try {
    const user = await User.findOne({ email });
     console.log(user)
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found!!!" });
    }

    // Check if the provided OTP matches the stored OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        messag: "Invalid OTP" });
    }

    // Update the user's password and clear the OTP

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.otp = null; // Clear the OTP
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

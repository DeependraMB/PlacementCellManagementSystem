const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // Set an expiration time for OTPs (e.g., 10 minutes)
  },
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;

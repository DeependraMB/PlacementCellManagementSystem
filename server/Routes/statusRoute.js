// Import necessary modules
const express = require("express");
const nodemailer = require("nodemailer");
const User = require("../Models/userModel");
const router = express.Router();

router.post("/update-student-status", async (req, res) => {
    
  const { email, newStatus } = req.body;
  
  try {
    // Validate that the newStatus is one of the allowed values
    if (!["Active", "Placed", "Blocked"].includes(newStatus)) {
      return res.status(400).json({ error: "Invalid status provided" });
    }

    // Update the status in the database
    const updatedUser = await User.findOneAndUpdate(
      {email},
      { $set: { status: newStatus } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

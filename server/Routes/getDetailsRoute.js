const express = require("express");
const router = express.Router();
const Education = require("../Models/educationModel"); // Replace with the actual model import
const Skills = require("../Models/skillsModel");

//get education details
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const educationDetails = await Education.findOne({ email });
    if (educationDetails) {
      res.status(200).json(educationDetails);
    } else {
      
      res.status(404).json({ error: "Education details not found" });
    }
  } catch (error) {
    console.error("Error in /get-education-details route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get education details
router.get("/get/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const skillsDetails = await Skills.findOne({ email });
    if (skillsDetails) {
      res.status(200).json(skillsDetails);
    } else {
      
      res.status(404).json({ error: "Skills details not found" });
    }
  } catch (error) {
    console.error("Error in /get-skills-details route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

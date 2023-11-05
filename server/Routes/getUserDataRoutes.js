const express = require("express");
const router = express.Router();
const Education = require("../Models/educationModel"); // Replace with the actual model import
const Skills = require("../Models/skillsModel");
const Personal = require("../Models/studentDetailsModel");


//get Personals Details
router.get("/get-personal-details", async (req, res) => {
    try {
      const personalDetails = await Personal.find();
      if (personalDetails) {
        res.status(200).json(personalDetails);
      } else {
        res.status(404).json({ error: "personal details not found" });
      }
    } catch (error) {
      console.error("Error in /get-personal-details route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


//get Education details
router.get("/get-education-details", async (req, res) => {
  try {
    const educationDetails = await Education.find();
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

//get Skills details
router.get("/get-skills-details", async (req, res) => {
  try {
    const skillsDetails = await Skills.find();
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

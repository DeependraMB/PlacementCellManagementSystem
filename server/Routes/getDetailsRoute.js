const express = require("express");
const router = express.Router();
const Education = require("../Models/educationModel"); // Replace with the actual model import
const Skills = require("../Models/skillsModel");
const User = require("../Models/userModel");
const Personal = require("../Models/studentDetailsModel");
const Department = require("../Models/departmentModel");
const path = require("path");


router.get("/get-students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-teachers", async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" });
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/get-teacher/:departmentId/:batch', async (req, res) => {
  try {
    const { departmentId, batch } = req.params;

    const teacher = await User.findOne({ departmentId, batch, role: 'teacher'  });
    console.log(teacher)
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error('Error fetching teacher details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/get-teacher/:id",async(req,res)=>{
  const teacherid = req.params.id;
  try {
    const teacher = await User.find({ _id : teacherid });
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

router.get("/get-user-byid/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const users = await User.findById(userId);

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/get-user-by-email/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await Personal.findOne({ email }); 
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get("/get-department-name/:departmentId", async (req, res) => {
  try {
    const departmentId = req.params.departmentId;

    const department = await Department.findOne({ departmentId });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ departmentName: department.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



//get education details
router.get("/get-education-details/:email", async (req, res) => {
  console.log("Mundalil");
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
router.get("/get-skills-details/:email", async (req, res) => {
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

router.use("/uploads", express.static(path.join(__dirname, "uploads")));
router.get("/get-profile-photo/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", filename);

  res.sendFile(filePath);
});

module.exports = router;

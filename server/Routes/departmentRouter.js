const express = require("express");
const router = express.Router();
const Department = require("../Models/departmentModel"); 

// Route to fetch all departments
router.get("/departments", async (req, res) => {
    console.log(res.data);
  try {
    const departments = await Department.find({}, "_id name departmentId");
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

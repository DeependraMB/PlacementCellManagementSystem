const express = require("express");
const User = require("../Models/userModel");

const router = express.Router();

router.get('/placed-students', async (req, res) => {
    try {
      // Fetch placed students from MongoDB
      const placedStudents = await User.find({ status: 'Placed' });
  
      res.json(placedStudents);
    } catch (error) {
      console.error('Error fetching placed students:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




module.exports = router;

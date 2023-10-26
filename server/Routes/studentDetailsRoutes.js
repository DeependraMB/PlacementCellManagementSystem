const express = require("express");
const router = express.Router();
const  studentDetailsController = require("../Controllers/studentDetailsControllers");

// Create a new student record
router.post("/studentDetails", async (req,res) =>{
    
    try {
       
        await studentDetailsController.createStudent(req, res);
    } catch (error) {
        console.error("Error in /signup route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
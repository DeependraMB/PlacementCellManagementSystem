const express = require("express");
const router = express.Router();
const  studentDetailsController = require("../Controllers/studentDetailsControllers");

// Create a new student record
router.post("/personaldetails", async (req,res) =>{
    
    try {
        console.log(req.body);
        await studentDetailsController.personalFormUpdate(req, res);
        
    } catch (error) {
        console.error("Error in /signup route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/educationdetails", async (req,res) =>{
    
    try {
        console.log(req.body);
        await studentDetailsController.educationFormUpdate(req, res);
        
    } catch (error) {
        console.error("Error in /signup route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/skillsdetails", async (req,res) =>{
    console.log("Mundalil");
    try {
        console.log(req.body);
        await studentDetailsController.skillsFormUpdate(req, res);
        
    } catch (error) {
        console.error("Error in /signup route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
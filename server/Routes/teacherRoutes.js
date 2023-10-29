const express = require("express");
const router = express.Router();
const { teacherRegController, teacherLoginController } = require('../Controllers/teacherController');
const AuthMiddleware = require("../Middleware/AuthMiddleware");


//REGISTER || Teacher

router.post("/register", async (req,res) =>{
    console.log(res.data);
    
    try {
        await teacherRegController(req, res);
    } catch (error) {
        console.error("Error in /signup route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// LOGIN || Teacher

router.post("/login", AuthMiddleware ,async (req,res) =>{
    try {
        await teacherLoginController(req, res);
    } catch (error) {
        console.error("Error in /signup route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
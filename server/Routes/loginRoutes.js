const express = require("express");
const router = express.Router();
const { loginController } = require('../Controllers/loginController');


// LOGIN || USERS
router.post("/login" ,async (req,res) =>{
    try {
        await loginController(req, res);
    } catch (error) {
        console.error("Error in /signup route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
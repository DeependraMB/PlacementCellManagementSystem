const express = require("express");
const router = express.Router();
const {
  alumniRegController,
  alumniLoginController
} = require("../Controllers/alumniController");
const {alumniJobShareController} = require("../Controllers/alumniJobShareController")
const AuthMiddleware = require("../Middleware/AuthMiddleware");

//REGISTER || Alumni

router.post("/register", async (req, res) => {
  try {
    await alumniRegController(req, res);
  } catch (error) {
    console.error("Error in /signup route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/job-share" ,async (req,res) =>{
    try {
        await alumniJobShareController(req, res);
    } catch (error) {
        console.error("Error in /JobSharing route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;

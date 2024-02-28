const express = require("express");
const router = express.Router();
const {
  alumniRegController,
  alumniLoginController,
  registerAlumniCSV,
} = require("../Controllers/alumniController");
const alumniJobShareController = require("../Controllers/alumniJobShareController");
const AuthMiddleware = require("../Middleware/AuthMiddleware");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//REGISTER || Alumni

router.post("/register", async (req, res) => {
  try {
    await alumniRegController(req, res);
  } catch (error) {
    console.error("Error in /signup route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST || Register Using CSV

router.post("/register-csv", upload.single("file"), async (req, res) => {
  try {
    await registerAlumniCSV(req, res);
  } catch (error) {
    console.error("Error in /update-job-status route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST || Job

router.post("/job-share", async (req, res) => {
  try {
    await alumniJobShareController.jobShare(req, res);
  } catch (error) {
    console.error("Error in /JobSharing route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET || Job Details

router.get("/get-job", async (req, res) => {
  try {
    await alumniJobShareController.getJob(req, res);
  } catch (error) {
    console.error("Error in /JobSharing route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST || Update Job Status

router.post("/update-job-status", async (req, res) => {
  try {
    await alumniJobShareController.updateJobStatus(req, res);
  } catch (error) {
    console.error("Error in /update-job-status route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/get-job-by-Id", async (req, res) => {
  try {
    await alumniJobShareController.getJobById(req, res);
  } catch (error) {
    console.error("Error in /get-job-by-Id Route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

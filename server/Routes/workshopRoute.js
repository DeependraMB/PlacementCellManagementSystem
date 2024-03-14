const express = require("express");
const router = express.Router();
const workshopController = require("../Controllers/workshopController");
const multer = require("multer");

// Multer configuration for storing uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for storing images
  },
  filename: function (req, file, cb) {
    // Set the filename to be unique to prevent overwriting
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Endpoint for adding a workshop with image upload
router.post("/add-workshop", upload.single("poster"), async (req, res) => {
  try {
    await workshopController.addWorkshop(req, res);
  } catch (error) {
    console.error("Error in /add-workshop route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-workshop", async (req , res) =>{
  try {
    await workshopController.getWorkshop(req, res);
  } catch (error) {
    console.error("Error in /get-workshop route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

router.get("/get-poster/:filename", async (req, res) => {
  try {
    await workshopController.getPoster(req, res);
  } catch (error) {
    console.error("Error in /get-poster route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;

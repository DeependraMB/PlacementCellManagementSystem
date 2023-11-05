const express = require("express");
const router = express.Router();
const studentDetailsController = require("../Controllers/studentDetailsControllers");
const multer = require("multer");
const path = require("path");

router.post("/userdetails", async (req, res) => {
  try {
    console.log(req.body);
    await studentDetailsController.userFormUpdate(req, res);
  } catch (error) {
    console.error("Error in /signup route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/personaldetails", async (req, res) => {
  try {
    console.log(req.body);
    await studentDetailsController.personalFormUpdate(req, res);
  } catch (error) {
    console.error("Error in /signup route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/educationdetails", async (req, res) => {
  const formData = req.body;
  console.log(formData.program);
  if (formData.program == "BTECH") {
    try {
      console.log(req.body);
      await studentDetailsController.educationFormUpdate(req, res);
    } catch (error) {
      console.error("Error in /signup route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    try {
        console.log(req.body);
        await studentDetailsController.educationMCAFormUpdate(req, res);
      } catch (error) {
        console.error("Error in /signup route:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
  }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });

  router.post("/skillsdetails", upload.fields([
    { name: "profilephoto", maxCount: 1 },
    { name: "resume", maxCount: 1 }
  ]), studentDetailsController.skillsFormUpdate);

module.exports = router;

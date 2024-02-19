const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require('pdf-parse');
const path = require("path");
const { gemini } = require("../Controllers/resumeController");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === '.pdf') {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs are allowed"), false);
    }
  }
});

// Remove this line
// router.use(upload.single('pdf'));

router.post("/resume-ats-checker", upload.single('pdf'), async (req, res) => {
  try {
    // const detail = "Fresher Job Opportunity";
    const pdfBuffer = req.file.buffer;

    if (pdfBuffer !== null) {
      const pdfData = await pdfParse(pdfBuffer);
      const pdfText = pdfData.text;
      let data = await gemini( applicantResume = pdfText);
      return res.json({ data });
    } else {
      res.status(400).json({ error: 'Invalid data' });
    }
  } catch (error) {
    console.error("Error in the route handler:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

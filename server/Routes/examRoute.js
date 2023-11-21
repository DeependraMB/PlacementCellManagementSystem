// routes/exams.js
const express = require("express");
const router = express.Router();
const Exam = require("../models/examModel");
const Question = require("../models/questionModel");

// Create Exam
router.post("/exam-details", async (req, res) => {
  try {
    const newExam = new Exam(req.body);
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Questions
router.post("/questions/:examId", async (req, res) => {
  try {
    const examId = req.params.examId;
    const questions = req.body;

    // Validate examId and questions
    if (!examId || !Array.isArray(questions)) {
      return res.status(400).json({ error: "Invalid examId or questions" });
    }

    // Save questions with the associated examId
    const savedQuestions = await Question.insertMany(
      questions.map((question) => ({ ...question, examId }))
    );

    res.status(201).json({ message: "Questions added successfully", questions: savedQuestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/exams/:teacherEmail', async (req, res) => {
    try {
      const email = req.params.teacherEmail;
      console.log(email);
      
      // Assuming teacherId is stored as a string in the database
      const exams = await Exam.find({ email });
      console.log(exams)
      
      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/questions/:examId', async (req, res) => {
    try {
      const examId = req.params.examId;
      const questions = await Question.find({ examId });
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;

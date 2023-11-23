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

    res.status(201).json({
      message: "Questions added successfully",
      questions: savedQuestions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/exams/:teacherEmail", async (req, res) => {
  try {
    const email = req.params.teacherEmail;
    console.log(email);

    // Assuming teacherId is stored as a string in the database
    const exams = await Exam.find({ email });
    console.log(exams);

    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/exam-values/:examId", async (req, res) => {
  try {
    const examId = req.params.examId;
    console.log(examId);
    const exam_details = await Exam.find({ _id: examId });
    console.log(exam_details);
    res.json(exam_details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/questions/:examId", async (req, res) => {
  try {
    const examId = req.params.examId;
    const questions = await Question.find({ examId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/check-answers", async (req, res) => {
    try {
      const { examId, selectedOptions } = req.body;
  
      // Fetch questions and correct answers based on the examId from the database
      const questionsWithCorrectAnswers = await Question.find({ examId });
  
      if (!questionsWithCorrectAnswers || questionsWithCorrectAnswers.length === 0) {
        return res.status(404).json({ error: "Questions not found for the exam" });
      }
  
      // Calculate user's score
      let score = 0;
  
      questionsWithCorrectAnswers.forEach((question) => {
        // Ensure userOptions is an array
        const selectedOption = Array.isArray(selectedOptions[question._id.toString()])
          ? selectedOptions[question._id.toString()]
          : [selectedOptions[question._id.toString()]]; // Wrap in an array if not already an array
  
        console.log("userOptions:", selectedOption);
        const correctOptions = question.correctOptions;
        console.log("correctOptions:", correctOptions);
  
        // Check if all correct options are selected by the user
        const intersection = new Set([...selectedOption].filter(x => correctOptions.includes(x)));
        const isCorrect = intersection.size === correctOptions.length;
        console.log("isCorrect:", isCorrect);
  
        if (isCorrect) {
          score += 1;
        }
      });
  
      console.log("Final score:", score);
      res.json({ score });
    } catch (error) {
      console.error("Error checking answers:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  
  

module.exports = router;

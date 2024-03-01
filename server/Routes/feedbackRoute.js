const express = require("express");
const router = express.Router();
const FeedbackModel = require("../Models/feedbackModel");
const Sentiment = require("sentiment");

router.post("/submit-feedback", async (req, res) => {
  const { subject, message, email, author, role } = req.body;

  try {
    const feedback = new FeedbackModel({
      subject,
      message,
      email,
      author,
      role,
    });

    const sentiment = new Sentiment();

    const result = sentiment.analyze(message);
    
    feedback.sentimentScore = result.score;

    await feedback.save();

    res.status(200).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-feedback", async (req, res) => {
  try {
    // Fetch all feedback from the database
    const feedbackData = await FeedbackModel.find();

    res.status(200).json(feedbackData);
  } catch (error) {
    console.error("Error getting feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

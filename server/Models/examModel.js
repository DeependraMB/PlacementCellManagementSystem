const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  email: { type: String, required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  timeToConduct: { type: String },
  duration: { type: Number, required: true },
  examDate: { type: Date, required: true },
  examTime: { type: String, required: true },
  accessCode: { type: String, required: true },
  numberOfQuestions: { type: Number, required: true },
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;

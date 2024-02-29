const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;

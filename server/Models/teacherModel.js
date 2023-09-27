const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  classteacher: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  phno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'teacher', 
  }
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;

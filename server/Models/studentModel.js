const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    //required: true,
  },
  
  lastname: {
    type: String,
    //required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    //required: true,
  },
  program: {
    type: String,
    //required: true,
  },
  graduationYear: {
    type: Number,
    //required: true,
  },
  
  phno: {
    type: String,
    //required: true,
  },
  email: {
    type: String,
    //required: true,
    unique: true,
  },
  password: {
    type: String,
    //required: true,
  },
  role: {
    type: String,
    default: 'student', 
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

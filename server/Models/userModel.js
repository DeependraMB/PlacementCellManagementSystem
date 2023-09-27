const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 
  userId: {
    type: String,
   // required: true,
  },
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
   // required: true,
  },
  phno: {
    type: String,
   // required: true,
  },
  department: {
    type: String,
   // required: true,
  },
  graduationYear: {
    type: Number,
   // required: true,
  },
  email: {
    type: String,
   // required: true,
    unique: true,
  },
  password: {
    type: String,
   // required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

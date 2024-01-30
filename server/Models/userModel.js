const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 
  uniregno: {
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
  mobno: {
    type: String,
   // required: true,
  },
  departmentId: {
    type: String,
  },
  batch: {
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
    enum: ["student", "teacher", "admin", "alumni"],
  },
  otp: {
    type: String,
  },
  otpemail: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "Placed", "Blocked", "Inactive"],
    default: "Active",
  },
 

});

const User = mongoose.model("User", userSchema);

module.exports = User;

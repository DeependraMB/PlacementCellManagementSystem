const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  tenthpercentage: {
    type: String,
    required: true,
  },
  tenthCGPA: {
    type: String,
    required: true,
  },
  tenthboard: {
    type: String,
    required: true,
  },
  tenthschoolname: {
    type: String,
    required: true,
  },
  twelthpercentage: {
    type: String,
    required: true,
  },
  twelthCGPA: {
    type: String,
    required: true,
  },
  twelthboard: {
    type: String,
    required: true,
  },
  twelthschoolname: {
    type: String,
    required: true,
  },
  ugcoursename: {
    type: String,
    required: true,
  },
  ugpercentage: {
    type: String,
    required: true,
  },
  ugCGPA: {
    type: String,
    required: true,
  },
  ugyearofgraduation: {
    type: String,
    required: true,
  },
  collegename: {
    type: String,
    required: true,
  },
  uguniversity: {
    type: String,
    required: true,
  },
  mcaaggregateCGPA: {
    type: String,
    required: true,
  },
  activearrears: {
    type: String,
    required: true,
  },
  historyofarrears: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
});
const Education = mongoose.model('Education', educationSchema);

module.exports = Education

const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  tenthpercentage: {
    type: String,
  },
  tenthCGPA: {
    type: String,
  },
  tenthboard: {
    type: String,
  },
  tenthschoolname: {
    type: String,
  },
  twelthpercentage: {
    type: String,
  },
  twelthCGPA: {
    type: String,
  },
  twelthboard: {
    type: String,
  },
  twelthschoolname: {
    type: String,
  },
  ugcoursename: {
    type: String,
    
  },
  ugpercentage: {
    type: String,
    
  },
  ugCGPA: {
    type: String,
  },
  ugyearofgraduation: {
    type: String,
  },
  ugcollegename: {
    type: String,
  },
  uguniversity: {
    type: String,
  },
  mcaaggregateCGPA: {
    type: String,
  },
  activearrears: {
    type: String,
  },
  historyofarrears: {
    type: String,
  },
  university: {
    type: String,
  },
});
const Education = mongoose.model('Education', educationSchema);

module.exports = Education

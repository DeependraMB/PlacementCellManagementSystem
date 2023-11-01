const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  technicalskills: {
    type: String,
    required: true,
  },
  projects: {
    type: String,
    required: true,
  },
  githublink: {
    type: String,
    required: true,
  },
  linkedinlink: {
    type: String,
    required: true,
  },
  languagesknown: {
    type: String,
    required: true,
  },
  profilephoto: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});


const Skills = mongoose.model("Skills", skillsSchema);

module.exports = Skills;

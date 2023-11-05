const Personal = require("../Models/studentDetailsModel");
const Education = require("../Models/educationModel");
const Skills = require("../Models/skillsModel");
const User = require("../Models/userModel");
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function validateFormData(formData) {
  for (const key in formData) {
    if (!formData[key]) {
      return false; // If any field is null or empty, return false
    }
  }
  return true; // All fields are filled
}

const userFormUpdate = async (req, res) => {
  const formData = req.body;
  console.log(formData);

  const existingUser = await User.findOne({ email: formData.email });
  console.log(existingUser);

  const userData = {
    uniregno: formData.uniregno,
    firstname: formData.firstname,
    lastname: formData.lastname,
    gender: formData.gender,
    mobno: formData.mobno,
  };
  await User.updateOne({ email: formData.email }, userData);
  res.status(200).json({ message: "Data Updated Successfully!!!!" });
};

const personalFormUpdate = async (req, res) => {
  const formData = req.body;

  const email = formData.email;

  if (!validateFormData(formData)) {
    return res
      .status(400)
      .json({ message: "Invalid data. All fields are required." });
  }

  const existingUser = await Personal.findOne({ email: formData.email });
  console.log(existingUser);

  if (existingUser) {
    const updatedData = {
      dob: formData.dob,
      personalemail: formData.personalemail,
      fathername: formData.fathername,
      mothername: formData.mothername,
      housename: formData.housename,
      postoffice: formData.postoffice,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      nationality: formData.nationality,
      profilepicture: formData.profilepicture,
    };
    await Personal.updateOne({ email: formData.email }, updatedData);
    res.status(200).json({ message: "Data Updated Successfully!!!!" });
  } else {
    console.log(formData);
    try {
      const personalInfo = new Personal({
        dob: formData.dob,
        personalemail: formData.personalemail,
        email: formData.email,
        fathername: formData.fathername,
        mothername: formData.mothername,
        housename: formData.housename,
        postoffice: formData.postoffice,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        nationality: formData.nationality,
        profilepicture: formData.profilepicture,
      });
      await personalInfo.save();
      res.status(200).json({ message: "Data Inserted Successfully!!!!" });
    } catch (error) {
      console.log(error);
    }
  }
};

const educationFormUpdate = async (req, res) => {
  const formData = req.body;
  const email = formData.email;
  console.log(email);

  const existingUser = await Education.findOne({ email: formData.email });
  console.log(existingUser);

  if (existingUser) {
    const updatedData = {
      email: formData.email,
      tenthpercentage: formData.tenthpercentage,
      tenthCGPA: formData.tenthCGPA,
      tenthboard: formData.tenthboard,
      tenthschoolname: formData.tenthschoolname,
      twelthpercentage: formData.twelthpercentage,
      twelthCGPA: formData.twelthCGPA,
      twelthboard: formData.twelthboard,
      twelthschoolname: formData.twelthschoolname,
      ugpercentage: formData.ugpercentage,
      ugCGPA: formData.ugCGPA,
      uguniversity: formData.uguniversity,
      activearrears: formData.activearrears,
      historyofarrears: formData.historyofarrears,
    };
    await Education.updateOne({ email: formData.email }, updatedData);
    res.status(200).json({ message: "Data Updated Successfully!!!!" });
  } else {
    console.log(formData);
    try {
      const educationalInfo = new Education({
        email: formData.email,
        tenthpercentage: formData.tenthpercentage,
        tenthCGPA: formData.tenthCGPA,
        tenthboard: formData.tenthboard,
        tenthschoolname: formData.tenthschoolname,
        twelthpercentage: formData.twelthpercentage,
        twelthCGPA: formData.twelthCGPA,
        twelthboard: formData.twelthboard,
        twelthschoolname: formData.twelthschoolname,
        ugpercentage: formData.ugpercentage,
        ugCGPA: formData.ugCGPA,
        uguniversity: formData.uguniversity,
        activearrears: formData.activearrears,
        historyofarrears: formData.historyofarrears,
      });
      await educationalInfo.save();
      res.status(200).json({ message: "Data Inserted Successfully!!!!" });
    } catch (error) {
      console.log(error);
    }
  }
};

const educationMCAFormUpdate = async (req, res) => {
  const formData = req.body;
  const email = formData.email;
  console.log(email);

  const existingUser = await Education.findOne({ email: formData.email });
  console.log(existingUser);

  if (existingUser) {
    const updatedData = {
      email: formData.email,
      tenthpercentage: formData.tenthpercentage,
      tenthCGPA: formData.tenthCGPA,
      tenthboard: formData.tenthboard,
      tenthschoolname: formData.tenthschoolname,
      twelthpercentage: formData.twelthpercentage,
      twelthCGPA: formData.twelthCGPA,
      twelthboard: formData.twelthboard,
      twelthschoolname: formData.twelthschoolname,
      ugcoursename: formData.ugcoursename,
      ugpercentage: formData.ugpercentage,
      ugCGPA: formData.ugCGPA,
      ugyearofgraduation: formData.ugyearofgraduation,
      ugcollegename: formData.ugcollegename,
      uguniversity: formData.uguniversity,
      mcaaggregateCGPA: formData.mcaaggregateCGPA,
      activearrears: formData.activearrears,
      historyofarrears: formData.historyofarrears,
      university: formData.university,
    };
    await Education.updateOne({ email: formData.email }, updatedData);
    res.status(200).json({ message: "Data Updated Successfully!!!!" });
  } else {
    console.log(formData);
    try {
      const educationalInfo = new Education({
        email: formData.email,
        tenthpercentage: formData.tenthpercentage,
        tenthCGPA: formData.tenthCGPA,
        tenthboard: formData.tenthboard,
        tenthschoolname: formData.tenthschoolname,
        twelthpercentage: formData.twelthpercentage,
        twelthCGPA: formData.twelthCGPA,
        twelthboard: formData.twelthboard,
        twelthschoolname: formData.twelthschoolname,
        ugcoursename: formData.ugcoursename,
        ugpercentage: formData.ugpercentage,
        ugCGPA: formData.ugCGPA,
        ugyearofgraduation: formData.ugyearofgraduation,
        ugcollegename: formData.ugcollegename,
        uguniversity: formData.uguniversity,
        mcaaggregateCGPA: formData.mcaaggregateCGPA,
        activearrears: formData.activearrears,
        historyofarrears: formData.historyofarrears,
        university: formData.university,
      });
      await educationalInfo.save();
      res.status(200).json({ message: "Data Inserted Successfully!!!!" });
    } catch (error) {
      console.log(error);
    }
  }
};


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

const skillsFormUpdate = async (req, res) => {
  const formData = req.body;
  console.log(formData);
  const email = formData.email;

  const existingUser = await Skills.findOne({ email: formData.email });
  console.log(existingUser);

  if (existingUser) {
    const updatedData = {
      email: formData.email,
      technicalskills: formData.technicalskills,
      projects: formData.projects,
      githublink: formData.githublink,
      linkedinlink: formData.linkedinlink,
      languagesknown: formData.languagesknown,
      profilephoto: req?.files?.profilephoto && req.files.profilephoto[0] && req.files.profilephoto[0].filename,
      resume: req?.files?.resume && req.files.resume[0] && req.files.resume[0].filename,
    };
    await Skills.updateOne({ email: formData.email }, updatedData);
    res.status(200).json({ message: "Data Updated Successfully!!!!" });
  } else {
    console.log(formData);
    try {
      const skillsInfo = new Skills({
        email: formData.email,
        technicalskills: formData.technicalskills,
        projects: formData.projects,
        githublink: formData.githublink,
        linkedinlink: formData.linkedinlink,
        languagesknown: formData.languagesknown,
        profilephoto: req.files["profilephoto"][0].filename,
        resume: req.files["resume"][0].filename,
      });
      await skillsInfo.save();
      res.status(200).json({ message: "Data Inserted Successfully!!!!" });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  personalFormUpdate,
  educationFormUpdate,
  skillsFormUpdate,
  userFormUpdate,
  educationMCAFormUpdate
};

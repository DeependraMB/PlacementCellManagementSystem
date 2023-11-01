const Personal = require("../Models/studentDetailsModel");
const Education = require("../Models/educationModel")
const Skills = require("../Models/skillsModel")

const personalFormUpdate = async (req, res) => {
  const formData = req.body;
 
  const email = formData.email;
  
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
  console.log(email)

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
      collegename: formData.collegename,
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
        collegename: formData.collegename,
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


const skillsFormUpdate = async (req, res) => {
  const formData = req.body;
 
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
      profilephoto: formData.profilephoto,
      resume: formData.resume,
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
        profilephoto: formData.profilephoto,
        resume: formData.resume,
      });
      await skillsInfo.save();
      res.status(200).json({ message: "Data Inserted Successfully!!!!" });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  personalFormUpdate, educationFormUpdate, skillsFormUpdate
};

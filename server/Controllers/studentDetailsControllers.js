const StudentDetails = require("../Models/studentDetailsModel");

const createStudent = async (req, res) => {
  const formData = req.body;
  console.log(formData);
  try {
    const student = new StudentDetails({
      firstName: formData.firstName,
      lastName: formData.lastName,
      uniregno: formData.uniregno,
      gender: formData.gender,
      phno: formData.phno,
      dob: formData.dob,
      personalEmail: formData.personalEmail,
      collegeEmail: formData.collegeEmail,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      houseName: formData.houseName,
      postOffice: formData.postOffice,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      nationality: formData.nationality,
      department: formData.department,
      batch: formData.batch,
      graduationyear: formData.graduationyear,
      tenthPercentage: formData.tenthPercentage,
      tenthCGPA: formData.tenthCGPA,
      tenthBoard: formData.tenthBoard,
      tenthSchoolName: formData.tenthSchoolName,
      twelfthPercentage: formData.twelfthPercentage,
      twelfthCGPA: formData.twelfthCGPA,
      twelfthBoard: formData.twelfthBoard,
      twelfthSchoolName: formData.twelfthSchoolName,
      ugCourseName: formData.ugCourseName,
      ugPercentage: formData.ugPercentage,
      ugCGPA: formData.ugCGPA,
      ugYearOfGraduation: formData.ugYearOfGraduation,
      collegeName: formData.collegeName,
      ugUniversity: formData.ugUniversity,
      mcaAggregateCGPA: formData.mcaAggregateCGPA,
      activeArrears: formData.activeArrears,
      historyOfArrears: formData.historyOfArrears,
      university: formData.university,
      technicalSkills: formData.technicalSkills,
      technicalSkills: formData.technicalSkills,
      internships: formData.internships,
      projects: formData.projects,
      githubLink: formData.githubLink,
      linkedinLink: formData.linkedinLink,
      achievements: formData.achievements,
      languagesKnown: formData.languagesKnown,
      profilePhoto: formData.profilePhoto,
      resume: formData.resume,
      workLocation: formData.workLocation,
    });
    await student.save();
    
    res.status(200).json({ message: "Data Inserted Successfully!!!!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a student record" });
  }
};

module.exports = {
  createStudent,
};

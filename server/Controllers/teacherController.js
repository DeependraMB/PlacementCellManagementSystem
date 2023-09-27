const { hashPassword,comparePassword } = require('../Helpers/registerHelper');
const Teacher = require('../Models/teacherModel');
const JWT = require("jsonwebtoken");
const AuthMiddleware = require('../Middleware/AuthMiddleware');

//Teacher Register COntroller

const teacherRegController = async (req, res) => {
    try {
      const formData = req.body;
  
      //Check User Exist or Not
      const existingUser = await Teacher.findOne({ email: formData.email });
  
      //Already Existing
      if (existingUser) {
        return res.status(200).send({
          success: false,
          message: "Already Registered ,Please Login",
        });
      }
  
      //DataBase Insertion
      const hashedPassword = await hashPassword(formData.password);
  
      const newTeacher = new Teacher ({
          firstname : formData.firstname,
          lastname : formData.lastname,
          gender : formData.gender,
          department : formData.department,
          graduationYear : formData.graduationYear,
          classteacher : formData.classteacher,
          phno : formData.phno,
          email : formData.email,
          password : hashedPassword
      });
      await newTeacher.save();
      res.status(200).send({
          success : true,
          message : "Teacher Registered Successfully",
      })
  
  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in signup",
        error: error,
      });
    }
  };


//Teacher Login Controller

const teacherLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const isPasswordValid = await comparePassword(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = JWT.sign({ _id: teacher._id, role: teacher.role }, process.env.JWT_SECRETKEY, {
      expiresIn: "7d",
    });
    res.status(200).json({ 
      success: true,
      message: "Login Successfully",
      token,
   });

  } catch(error){
      console.error('Error during student login:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

  
  module.exports = {
    teacherRegController,teacherLoginController
  };
  
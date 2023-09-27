const { hashPassword, comparePassword } = require("../Helpers/registerHelper");
// const Student = require("../Models/studentModel");
const JWT = require("jsonwebtoken");
const AuthMiddleware = require("../Middleware/AuthMiddleware");
const User = require("../Models/userModel");

//Student Register Controller

const studentRegController = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);

    //Check User Exist or Not
    const existingUser = await User.findOne({ email: formData.email });

    //Already Existing
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered ,Please Login",
      });
    }

    //DataBase Insertion
    const hashedPassword = await hashPassword(formData.password);

    const newStudent = new User({
      
      userId: formData.uniregno,
      firstname: formData.firstName,
      lastname: formData.lastName,
      gender: formData.gender,
      phno: formData.mobno,
      department: formData.department,
      graduationYear: formData.graduationyear,
      email: formData.email,
      password: hashedPassword,
      role: formData.role,
    });
    console.log(newStudent);
    console.log(newStudent);
    await newStudent.save();
    res.status(200).send({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in signup",
      error: error,
    });
  }
};

//Student Login Controller

const studentLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isPasswordValid = await comparePassword(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = JWT.sign(
      { _id: student._id, role: student.role },
      process.env.JWT_SECRETKEY,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    console.error("Error during student login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  studentRegController,
  studentLoginController,
};

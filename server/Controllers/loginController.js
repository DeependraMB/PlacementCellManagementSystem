const { hashPassword, comparePassword } = require("../Helpers/registerHelper");
// const Student = require("../Models/studentModel");
const JWT = require("jsonwebtoken");
const AuthMiddleware = require("../Middleware/AuthMiddleware");
const User = require("../Models/userModel");


//Student Login Controller

const loginController = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid Email or Password" });
      }
  
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = JWT.sign(
        { _id: user._id },
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
    loginController,
  };
  
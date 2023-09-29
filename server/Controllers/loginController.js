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
      // const payload = {
      //   _id: user._id,
      //   email: user.email, // Add the user's email to the payload
      //   role: user.role,   // Add the user's role to the payload (if available)
      // };

      const token = JWT.sign(
        
        { _id: user._id },
        process.env.JWT_SECRETKEY,
        {
          expiresIn: "1d",
        }
      );

      // const cookie = require('cookie');
      // const jwtCookie = cookie.serialize('token', token, {
      //   httpOnly: true,
      //   secure: process.env.JWT_SECRETKEY === 'production', // Enable in production
      //   sameSite: 'strict', // Adjust as needed
      //   maxAge: 3600, // Token expiration time in seconds
      //   path: '/', // Adjust as needed
      // });
  
      // // Set the cookie in the response header
      // res.setHeader('Set-Cookie', jwtCookie);
      res.status(200).json({
        success: true,
        message: "Login Successfully",
        user: {
          _id: user._id,
          name: user.firstname,
          email: user.email,
          role: user.role,
        },
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
  
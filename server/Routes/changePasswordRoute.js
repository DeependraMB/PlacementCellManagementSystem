const express = require("express");
const router = express.Router();
const User = require("../Models/userModel")
const {hashPassword,comparePassword} = require("../Helpers/registerHelper")
const bcrypt = require('bcrypt');

router.post('/teacher-change-password/:email', async (req, res) => {
  console.log("Mundalil");
    const email = req.params.email;
    const { currentPassword, newPassword } = req.body;
    console.log(email,currentPassword,newPassword);
    try {
      const user = await User.findOne({email});
      console.log(user);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      console.log("123");
      console.log(user.password);
      // Check if the provided current password matches the one in the database
      const isPasswordValid = await comparePassword(currentPassword, user.password);
      console.log("ads",isPasswordValid);
  
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }
  
      // Hash the new password before saving it
      const hashedPassword = await hashPassword(newPassword,10);
      console.log(hashedPassword)
  
      const userModelInstance = new User(user);

      userModelInstance.password = hashedPassword;
      console.log(userModelInstance.password);

      await userModelInstance.save();
      res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }


});





module.exports = router;
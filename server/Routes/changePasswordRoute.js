const express = require("express");
const router = express.Router();
const User = require("../Models/userModel")


router.post('/teacher-change-password/:email', async (req, res) => {
    const email = req.params.email;
    const { currentPassword, newPassword } = req.body;
    console.log(email,currentPassword,newPassword);
    try {
     
      const user = await User.find({email});
      console.log(user);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Check if the provided current password matches the one in the database
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }
  
      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }


});





module.exports = router;
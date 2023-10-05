const express = require("express");
const router = express.Router();
const resetpasswordController = require("../Controllers/resetpasswordController");


router.post("/forgot-password",resetpasswordController.sendOTP );
router.post("/reset-password", resetpasswordController.verifyOTPAndResetPassword);


// // RESET PASSWORD EMAIL
// router.post("/forgot-password" ,async (req,res) =>{
//     console.log(req.body)
//     try {
//         sendResetPasswordEmail(req, res);
//         console.log(req.body);
//     } catch (error) {
//         console.error("Error in /signup route:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// RESET PASSWORD

// router.post("/reset-password/:token" ,async (req,res) =>{
//     try {
//         await resetPassword(req, res);
//         console.log(req.body)
//     } catch (error) {
//         console.error("Error in /signup route:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

module.exports = router;
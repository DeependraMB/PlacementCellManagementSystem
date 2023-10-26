const express = require("express");
const router = express.Router();
const verifyEmailController = require('../Controllers/verifyEmailController')

router.post("/verify-email",verifyEmailController.sendOTP );

module.exports = router;
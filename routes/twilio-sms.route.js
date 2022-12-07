const express = require("express");
const router = express.Router();

//Controllers
const { sendOTP, verifyOTP } = require("../controllers/twilio-sms.controller");

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;

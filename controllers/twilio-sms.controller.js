const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } =
  process.env;

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

// MAKE SURE TO ENABLE ALL THE GEO PERMISSIONS IN YOUR TWILIO ACCOUNT

const sendOTP = async (req, res) => {
  const { countryCode, phoneNumber } = req.body;
  try {
    const otpResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: "sms",
      });
    res.status(200).json({ message: "OTP sent successfully", otpResponse });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

const verifyOTP = async (req, res) => {
  const { countryCode, phoneNumber, otp } = req.body;
  try {
    const verificationResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
      });
    res
      .status(200)
      .json({ message: "OTP verified successfully", verificationResponse });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

module.exports = { sendOTP, verifyOTP };

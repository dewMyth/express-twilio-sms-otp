const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

require("dotenv").config();

const twilioSmsRoute = require("./routes/twilio-sms.route");

app.use("/twilio-sms", twilioSmsRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});

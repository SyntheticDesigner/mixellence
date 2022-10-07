import { refreshToken } from "firebase-admin/app";

const handler = async (req, res) => {
  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.PROXY_EMAIL,
      pass: process.env.PROXY_PASSWORD,
      clientId: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  let mailOptions = {
    from: req.body.email,
    to: process.env.USER_EMAIL,
    subject: `Mixellence Message from ${req.body.name}`,
    text: `From: ${req.body.name}, Email: ${req.body.email}, Message: ${req.body.body}`,
  };
  try {
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        throw new Error("Error " + err);
      } else if (data) {
        res.status(200).json({ message: "Message Sent", data: data });
      } else {
        throw new Error("No auth Response");
      }
    });
  } catch (error) {
    res.status(500).json({ message: "SOMETHING WENT WRONG", error });
  }
};

export default handler;

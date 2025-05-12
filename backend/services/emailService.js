const nodemailer = require("nodemailer")

const sendEmail = async (email,subject,html) => {
  const transporter = nodemailer.createTransport({
    host: process.env,
    port: process.env,
    auth: {
      user: process.env,
      pass: process.env
    },
  });

  await transporter.sendMail({
    from: `"TimeCue" <${process.env}>`,
    to: email,
    subject,
    html
  });
}

module.exports = sendEmail;
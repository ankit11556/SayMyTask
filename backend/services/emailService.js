const nodemailer = require("nodemailer")

const sendEmail = async (email,subject,html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASS
    },
  });

  await transporter.sendMail({
    from: `"TimeCue" <${process.env.BREVO_EMAIL}>`,
    to: email,
    subject,
    html
  });
}

module.exports = sendEmail;
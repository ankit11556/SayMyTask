const nodemailer = require("nodemailer")

let transporter;

const sendEmail = async (email,subject,html) => {
  if(transporter) return transporter;

   transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT,10),
    secure: process.env.SMTP_PORT == '465',
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASS
    },
  });

  await transporter.sendMail({
    from: `"SayMyTask" <${process.env.BREVO_EMAIL}>`,
    to: email,
    subject,
    html
  });
}

module.exports = sendEmail;
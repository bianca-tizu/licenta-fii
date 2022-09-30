import * as nodemailer from "nodemailer";

export const sendEmail = async options => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.ADMIN_EMAIL} <${process.env.ADMIN_EMAIL}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  });
};

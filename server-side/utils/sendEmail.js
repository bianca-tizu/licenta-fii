import * as nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "ujj3hcbpocjuiiar@ethereal.email",
      pass: "222AXhvt4PDK2tzmHx",
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  });

  console.log("Message sent ", info);
};

"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();

async function sendEmail(to, subject, text, html) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //"smtp.gmail.com" for using gmail
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.SENDER_EMAIL}`,
      pass: `${process.env.SENDER_PASSWORD}`,
    },
  });

  let info = await transporter.sendMail({
    from: `"${process.env.SENDER_NAME}"${process.env.SENDER_EMAIL}`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

sendEmail("spatkar131201@gmail.com", "Hello ✔", "Hello world?", "<b>Hello world?</b>").catch(console.error);

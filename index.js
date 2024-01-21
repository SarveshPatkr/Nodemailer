"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();
// get welcome.html file from /assets/html/welcome.html
const fs = require("fs");
const path = require("path");
const filePathHtml = path.join(__dirname, "assets", "html", "welcome.html");
// get welcome.txt file from /assets/copy/welcome.txt
const filePathCopy = path.join(__dirname, "assets", "copy", "welcome.txt");

// read content of welcome.html and welcome.txt and store in variables
const html = fs.readFileSync(filePathHtml, "utf-8");
const text = fs.readFileSync(filePathCopy, "utf-8");


async function sendEmail(to, subject, text, html) {
  let transporter = nodemailer.createTransport({
    host: "smtp.privateemail.com", //"smtp.gmail.com" for using gmail
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

  console.log("Message sent: %s", info);
}

sendEmail("siddharthmanjrekar1402109@gmail.com", "Welcome to Frover", text, html).catch(console.error);

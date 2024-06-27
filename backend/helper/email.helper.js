const nodemailer = require('nodemailer');
const { promisify } = require('util');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'maixuanytp3@gmail.com',
    pass: 'fsmn foiy vldi smey',
  }
});

const sendMailNodeJS = promisify(transporter.sendMail).bind(transporter);

module.exports = sendEmail = async (from, to, subject, text, html) => {
  try {
    const info = await sendMailNodeJS({
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    console.log('Email sent:', info.response);
  } catch (error) {
    console.log('Error:', error);
  }
}


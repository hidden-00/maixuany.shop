const sendEmail = require('./email.helper');

const from = 'maixuanytp3@gmail.com';
const to = 'xuanytp3@gmail.com';
const subject = 'Subject of the Email';
const text = '1234';
const html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .header {
          background-color: #f2f2f2;
          padding: 10px;
          text-align: center;
        }
        .content {
          margin: 20px;
        }
        .footer {
          background-color: #f2f2f2;
          padding: 10px;
          text-align: center;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Welcome to Our Service</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>This is an example email sent using Nodemailer with HTML and CSS.</p>
        <p>This Code is ${text}</p>
        <p>Thank you for joining us!</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </body>
  </html>
`;

(async () => {
  await sendEmail(from, to, subject, text, html);
})();

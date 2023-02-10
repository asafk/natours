const nodemailer = require('nodemailer');

const sendEmail = async options => {
  console.log('sendEmail');
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    // auth: {
    //   user: process_params.env.EMAIL_USERNAME,
    //   pass: process_params.env.EMAIL_PASSWORD
    // }
    // Active in gmail "less secure app" option
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '47db793b47e0d5',
      pass: 'c2971eb159872f'
    }
  });

  //2) Define the email options
  const mailOptions = {
    from: 'Jonas Schmedmann <hello@jonas.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html
  };

  console.log(mailOptions);
  //3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

const nodemailer = require("nodemailer");

sendEmail = async (req, res) => {
  //creating the test account for sending email
  let testAccount = await nodemailer.createTestAccount();

  //Transporter object for building the connection with ethereal server which is used to send the email
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "shu5lut@gmail.com", // generated ethereal user
      pass: "ldplbgezdbxdfmte", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"BeastThatCodes 👻" <shubhamlutade131@gmail.com>', // sender address
    to: "shubhamlutade131@gmail.com", // list of receivers
    subject: "Email from NodeMailer ✔", // Subject line
    text: "Hey this mac book is great", // plain text body
    html: "<b>Awesome</b>", // html body
  });

  res.status(200).send("Email sent. Please check your inbox");
};

module.exports = sendEmail;

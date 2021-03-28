// const sgMail = require("@sendgrid/mail")
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// exports.contactForm = (req,res) => {
//     const {name, email, message} = req.body;

//     const emailData = {
//         to: process.env.EMAIL_TO,
//         from: process.env.EMAIL_TO,
//         subject: `Contact form - ${process.env.APP_NAME}`,
//         text: `Email received from contact form \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
//         html: `
//             <h4>Email received from contact form</h4>
//             <p>Sender name: ${name}</p>
//             <p>Sender email: ${email}</p>
//             <p>Sender message: ${message}</p>
//             <hr/>
//             <p>This email contains sensitive information</p>
//             <p>https://seoblog.com</p>
//         `
//     }


//     sgMail.send(emailData)
//     .then( sent => {
//         return res.json({
//             success: true
//         })
//     })
//     .catch( error => {
//         return res.send({
//             error: error
//         })
//     })
// }

const { sendEmailWithNodemailer } = require("../helpers/email");
 
exports.contactForm = (req, res) => {
  console.log(req.body);
  const { name, email, message } = req.body;
 
  const emailData = {
    from: process.env.EMAIL_TO, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
    to: process.env.EMAIL_TO, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
    subject: "Website Contact Form",
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
        <h4>Email received from contact form:</h4>
        <p>Sender name: ${name}</p>
        <p>Sender email: ${email}</p>
        <p>Sender message: ${message}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>https://onemancode.com</p>
    `,
  };
 
  sendEmailWithNodemailer(req, res, emailData);
};

//contactBlogAuthorForm

exports.contactBlogAuthorForm = (req, res) => {
  console.log(req.body);
  const { authorEmail, name, email, message } = req.body;

  let mailList = [authorEmail, process.env.EMAIL_TO]
 
  const emailData = {
    from: process.env.EMAIL_TO, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
    to: mailList, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
    subject: `Someone messaged you from ${process.env.APP_NAME} `,
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
        <h4>Message received from:</h4>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>https://onemancode.com</p>
    `,
  };
 
  sendEmailWithNodemailer(req, res, emailData);
};
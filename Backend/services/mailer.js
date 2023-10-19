const { createTransport } = require('nodemailer');

const transporter = createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: "<your-login>",
        pass: "<your-key>",
    },
});

// const mailOptions = {
//     from: '<your-login>',
//     to: '<your-receiver>',
//     subject: `Your subject`,
//     text: `Your text content`
// };

// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });
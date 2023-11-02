const { createTransport } = require('nodemailer');

const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.SMTP_Email,
        pass: process.env.SMTP_PASS,
    },
});

module.exports = {
    transporter   
}
const nodemailer = require('nodemailer');
const { MAIL_SERVICE, MAIL_USER_EMAIL, MAIL_USER_PASSWORD, MAIL_HOST , MAIL_PORT} = process.env;

exports.mailTransporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    auth: {
        user: MAIL_USER_EMAIL,
        pass: MAIL_USER_PASSWORD
    }
});

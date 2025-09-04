const nodemailer = require('nodemailer');

const sendEmail = async options =>{
    const transport = {
        host : process.env.MTP_HOST,
        port : process.env.MTP_PORT,

        auth : {
            user : process.env.MTP_USERNAME,    
            pass : process.env.MTP_PASSWORD
        }
    };
    const transporter = nodemailer.createTransport(transport)

    const message = {
        form: `${process.env.MTP_FROM_USERNAME} <${process.env.MTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(message);
} ;

module.exports = sendEmail;


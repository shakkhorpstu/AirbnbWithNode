const nodemailer = require('nodemailer');

const send = async (data, url = null) => {
    let transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
           user: process.env.MAIL_USERNAME,
           pass: process.env.MAIL_PASSWORD
        }
    });

    const message = {
        from: process.env.MAIL_FROM, // Sender address
        to: data.email,         // List of recipients
        subject: 'Welcome to learning world', // Subject line
        html: `<a href='${url}'>Click here to verify your email</a>` // Plain text body
    };

    await transport.sendMail(message, function(err, info) {
        if (err) {
          console.log('Failed')
        } else {
            console.log('Success');
        }
    });
}

module.exports = {
    send
}
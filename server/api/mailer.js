const nodemailer = require("nodemailer");

const User = require('../models/User');
const { signToken } = require('./jsonwebtoken');

/**
 * Send a confirmation email to a user to activate their account.
 * @param {string} email The id of the user to send the email to.
 */
const sendConfirmationEmail = async (email) => {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    const user = await User.findOne({ email: email }); // get user from email
    
    // create token
    const confirmationToken = signToken(
        { id: user._id },
        process.env.CONFIRMATION_TOKEN_SECRET,
        { expiresIn: "1h" }
    );

    // send mail with defined transport object
    transporter.sendMail(
        {
            from: '"MD-Fitness" <srgupta@bigpond.com>', // sender address
            to: `${user.email}`, // list of receivers
            subject: "Confirmation email", // Subject line
            html: `<b>Hello ${user.name}</b>
            <p>Link here : <a target="_" href="${process.env.DOMAIN}/confirm-email/${confirmationToken}">Link</a></p>
            `, // html body
        },
        (error, info) => {
            if (error) return error.message;
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return '';
        }
    );
};

module.exports = { sendConfirmationEmail };

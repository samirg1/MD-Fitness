const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (id) => {
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

    // send mail with defined transport object
    await transporter.sendMail(
        {
            from: '"MD-Fitness" <srgupta@bigpond.com>', // sender address
            to: "srgupta@bigpond.com", // list of receivers
            subject: "Confirmation email", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Hello world?</b>
            <p>Link here : <a target="_" href="${process.env.DOMAIN}/confirm-email/${id}">Link</a></p>
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

import nodemailer from "nodemailer";

import UserModel from "../models/User";
import { signToken } from "./jsonwebtoken";

/**
 * Send an email to a user.
 * @param userEmail The email of the user to send the email to.
 * @param emailHtml The html of the email to send.
 * @param subject The subject of the email to send.
 */
const sendEmail = async (
    userEmail: string,
    emailHtml: string,
    subject: string
) => {
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

    transporter.sendMail(
        {
            from: '"MD-Fitness" <srgupta@bigpond.com',
            to: `${userEmail}`,
            subject,
            attachments: [
                {
                    filename: "tiktok_icon.png",
                    path: __dirname + "/mailerAttachments/tiktok_icon.png",
                    cid: "tiktok_icon",
                },
                {
                    filename: "instagram_icon.png",
                    path: __dirname + "/mailerAttachments/instagram_icon.png",
                    cid: "instagram_icon",
                },
                {
                    filename: "logo.png",
                    path: __dirname + "/mailerAttachments/logo.png",
                    cid: "logo",
                },
            ],
            html: emailHtml,
        },
        (error, info) => {
            if (error) throw new Error(error.message);
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
    );
};

/**
 * Send a confirmation email to a user to activate their account.
 * @param userEmail The email of the user to send the email to.
 * @throws If user is not found or if there is an error during sending.
 */
export const sendConfirmationEmail = async (
    userEmail: string,
    emailHtml: string
) => {
    const user = await UserModel.findOne({ email: userEmail }); // get user from email
    if (!user) throw new Error("User not found");

    const confirmationToken = signToken({ id: user._id }, "confirmation");
    emailHtml = emailHtml.replace("%CONFIRMATION_TOKEN%", confirmationToken);

    sendEmail(userEmail, emailHtml, "Confirm your Email");
};

export const sendWelcomeEmail = async (userEmail: string, emailHtml: string) => {
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) throw new Error("User not found");

    emailHtml = emailHtml.replace("%USER_NAME%", user.name);
    sendEmail(userEmail, emailHtml, "Welcome!");
}

export const sendPurchaseConfirmationEmail = async (userEmail: string, emailHtml: string, productName: string) => {
    emailHtml = emailHtml.replace("%PRODUCT_NAME%", productName);
    sendEmail(userEmail, emailHtml, "Purchase Confirmation");
}

export const sendPasswordResetEmail = async (userEmail: string, emailHtml: string, code: string) => {
    emailHtml = emailHtml.replace("%RESET_CODE%", code);
    sendEmail(userEmail, emailHtml, "Password Reset");
}


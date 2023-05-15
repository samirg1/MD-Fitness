import nodemailer from "nodemailer";

import UserModel from "../models/User";
import { signToken } from "./jsonwebtoken";

let transporter: nodemailer.Transporter;

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
    if (transporter === undefined) {
        transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: "mdfitness3152@gmail.com", // generated ethereal user
                pass: process.env.GMAIL_PASSWORD, // generated ethereal password
            },
        });
    }

    transporter.sendMail(
        {
            from: '"MD-Fitness" <mdfitness3512@gmail.com>',
            to: `${userEmail}`,
            subject,
            attachments: [
                {
                    filename: "tiktok_icon.png",
                    path: __dirname + "/mailerAttachments/tiktok_icon.png",
                    cid: "tiktok",
                },
                {
                    filename: "instagram_icon.png",
                    path: __dirname + "/mailerAttachments/instagram_icon.png",
                    cid: "instagram",
                },
                {
                    filename: "logo.png",
                    path: __dirname + "/mailerAttachments/logo.png",
                    cid: "logo",
                },
            ],
            html: emailHtml,
        },
        (error, _) => {
            if (error) throw new Error(error.message);
        }
    );
};

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

export const sendWelcomeEmail = async (
    userEmail: string,
    emailHtml: string
) => {
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) throw new Error("User not found");

    emailHtml = emailHtml.replace("%USER_NAME%", user.name);
    sendEmail(userEmail, emailHtml, "Welcome!");
};

export const sendPurchaseConfirmationEmail = async (
    userEmail: string,
    emailHtml: string,
    productName: string
) => {
    emailHtml = emailHtml.replace("%PRODUCT_NAME%", productName);
    sendEmail(userEmail, emailHtml, "Purchase Confirmation");
};

export const sendPasswordResetEmail = async (
    userEmail: string,
    emailHtml: string,
    code: string
) => {
    emailHtml = emailHtml.replace("%RESET_CODE%", code);
    sendEmail(userEmail, emailHtml, "Password Reset Code");
};

export const sendPasswordResetConfirmationEmail = async (
    userEmail: string,
    emailHtml: string
) => {
    sendEmail(userEmail, emailHtml, "Password Change Confirmation");
};

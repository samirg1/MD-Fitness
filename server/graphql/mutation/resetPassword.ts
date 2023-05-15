import crypto from "crypto";

import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { comparePassword, hashPassword } from "../../api/bcrypt.js";
import validateObject from "../../api/joi.js";
import {
    sendPasswordResetConfirmationEmail,
    sendPasswordResetEmail,
} from "../../api/mailer.js";
import UserModel from "../../models/User.js";

const RESET_PASSWORD_ATTEMPTS = 5;
const RESET_PASSWORD_CODE_LENGTH = 12;

const ResetPasswordType = new GraphQLObjectType({
    name: "PasswordReset",
    description: "Restting a user's password",
    fields: () => ({
        requestResetCode: {
            type: GraphQLBoolean,
            description: "Request a reset code",
            args: {
                userEmail: { type: GraphQLNonNull(GraphQLString) },
                emailHtml: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, { userEmail, emailHtml }) => {
                const foundUser = await UserModel.findOne({ email: userEmail });
                if (!foundUser)
                    throw new Error("No user found with that email");

                const resetPasswordCode = crypto
                    .randomBytes(RESET_PASSWORD_CODE_LENGTH)
                    .toString("base64");
                foundUser.resetPasswordCode = await hashPassword(
                    resetPasswordCode
                );
                foundUser.resetPasswordAttemptsLeft = RESET_PASSWORD_ATTEMPTS;
                await foundUser.save();

                await sendPasswordResetEmail(
                    userEmail,
                    emailHtml,
                    resetPasswordCode
                );
                return true;
            },
        },

        reset: {
            type: GraphQLBoolean,
            description: "Reset a user's password",
            args: {
                userEmail: { type: GraphQLNonNull(GraphQLString) },
                resetPasswordCode: { type: GraphQLNonNull(GraphQLString) },
                newPassword: { type: GraphQLNonNull(GraphQLString) },
                emailHtml: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (
                _,
                { userEmail, resetPasswordCode, newPassword, emailHtml }
            ) => {
                const foundUser = await UserModel.findOne({ email: userEmail });
                if (!foundUser)
                    throw new Error("No user found with that email");
                if (foundUser.resetPasswordAttemptsLeft === 0)
                    throw new Error(
                        "Too many attempts, please attempt to reset password again"
                    );

                const validResetCode = await comparePassword(
                    resetPasswordCode,
                    foundUser.resetPasswordCode!
                );
                if (!validResetCode || foundUser.resetPasswordCode === "") {
                    const current = foundUser.resetPasswordAttemptsLeft!;
                    foundUser.resetPasswordAttemptsLeft = current - 1;
                    await foundUser.save();
                    throw new Error(
                        `Invalid reset code (${current} attempt${
                            current === 1 ? "" : "s"
                        } left)`
                    );
                }

                validateObject({ password: newPassword }, "newPassword");
                foundUser.password = await hashPassword(newPassword);
                foundUser.resetPasswordCode = "";
                await foundUser.save();

                sendPasswordResetConfirmationEmail(userEmail, emailHtml);

                return true;
            },
        },
    }),
});

export default ResetPasswordType;

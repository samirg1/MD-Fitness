import crypto from "crypto";

import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { hashPassword } from "../../api/bcrypt";
import validateObject from "../../api/joi";
import { sendPasswordResetConfirmationEmail, sendPasswordResetEmail } from "../../api/mailer";
import UserModel from "../../models/User";

const ResetPasswordType = new GraphQLObjectType({
    name: "Password Reset",
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
                    .randomBytes(3)
                    .toString("hex")
                    .toUpperCase();
                foundUser.resetPasswordCode = resetPasswordCode;
                await foundUser.save();

                sendPasswordResetEmail(userEmail, emailHtml, resetPasswordCode);
                return true;
            },
        },

        resetPassword: {
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
                    throw new Error("Too many attempts, please attempt to reset password again");
                if (foundUser.resetPasswordCode !== resetPasswordCode) {
                    foundUser.resetPasswordAttemptsLeft = (foundUser.resetPasswordAttemptsLeft ?? 5) - 1;
                    await foundUser.save();
                    throw new Error("Invalid reset code");
                }
                
                validateObject({ password: newPassword }, "newPassword");
                foundUser.password = await hashPassword(newPassword);
                foundUser.resetPasswordCode = "";
                foundUser.resetPasswordAttemptsLeft = 5;
                await foundUser.save();

                sendPasswordResetConfirmationEmail(userEmail, emailHtml);

                return true;
            },
        },
    }),
});

export default ResetPasswordType;

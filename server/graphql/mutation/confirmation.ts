import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

import { verifyToken } from "../../api/jsonwebtoken";
import { sendConfirmationEmail, sendWelcomeEmail } from "../../api/mailer";
import UserModel from "../../models/User";

/**
 * GraphQL mutation object for confirming user emails.
 */
const ConfirmationType = new GraphQLObjectType({
    name: "Confirmation",
    description: "Sending confirmation email / confirming user's email address",
    fields: () => ({
        send: {
            type: GraphQLBoolean,
            description: "Send confirmation email",
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                emailHtml: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, { email, emailHtml }) => {
                await sendConfirmationEmail(email, emailHtml); // get error if there was one
                return true;
            },
        },

        confirm: {
            type: GraphQLBoolean,
            description: "Confirm email",
            args: {
                token: { type: GraphQLNonNull(GraphQLString) },
                emailHtml: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, { token, emailHtml }) => {
                // verify token to get id
                await verifyToken(token, "confirmation", async (decoded) => {
                    const user = await UserModel.findById(decoded.id); // find the user
                    if (!user) throw new Error("Specified user not found");
                    user.activated = true; // activate the user

                    try {
                        await user.save();
                    } catch (error) {
                        throw new Error("User saving failed: " + error.message);
                    }

                    sendWelcomeEmail(user.email, emailHtml);
                });

                return true;
            },
        },
    }),
});

export default ConfirmationType;

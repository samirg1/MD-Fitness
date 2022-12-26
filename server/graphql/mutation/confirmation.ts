import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

import { verifyToken } from "../../api/jsonwebtoken";
import { sendConfirmationEmail } from "../../api/mailer";
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
            args: { email: { type: GraphQLNonNull(GraphQLString) } },
            resolve: async (_, { email }, __) => {
                await sendConfirmationEmail(email); // get error if there was one
                return true;
            },
        },

        confirm: {
            type: GraphQLBoolean,
            description: "Confirm email",
            args: { token: { type: GraphQLNonNull(GraphQLString) } },
            resolve: async (_, { token }, __) => {
                // verify token to get id
                verifyToken(token, "confirmation", async (decoded) => {
                    const user = await UserModel.findOne({ _id: decoded.id }); // find the user
                    if (!user) throw new Error("Specified user not found");
                    user.activated = true; // activate the user

                    try {
                        await user.save();
                    } catch (error) {
                        throw new Error("User saving failed: " + error.message);
                    }
                });

                return true;
            },
        },
    }),
});

export default ConfirmationType;

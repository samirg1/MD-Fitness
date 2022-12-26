const {
    GraphQLBoolean,
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
} = require("graphql");

const { verifyToken } = require("../../api/jsonwebtoken");
const UserModel = require("../../models/User");
const { sendConfirmationEmail } = require("../../api/mailer");

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
                const error = await sendConfirmationEmail(email); // get error if there was one
                if (error) throw new Error(error);
                return true;
            },
        },

        confirm: {
            type: GraphQLBoolean,
            description: "Confirm email",
            args: { token: { type: GraphQLNonNull(GraphQLString) } },
            resolve: async (_, { token }, __) => {
                // verify token to get id
                let id;
                verifyToken(
                    token,
                    "confirmation",
                    (decoded) => (id = decoded.id)
                );

                const user = await UserModel.findOne({ _id: id }); // find the user
                if (!user) throw new Error("Specified user not found");
                user.activated = true; // activate the user

                try {
                    await user.save();
                } catch (error) {
                    throw new Error("User saving failed: " + error.message);
                }
                return true;
            },
        },
    }),
});

module.exports = ConfirmationType;

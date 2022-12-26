const { GraphQLBoolean, GraphQLString } = require("graphql");
const { verifyToken } = require("../../api/jsonwebtoken");
const UserModel = require("../../models/User");

const confirmation = {
    sendConfirmation: {
        type: GraphQLBoolean,
        description: "Send confirmation email",
        args: {
            email: { type: GraphQLString },
        },
        resolve: async (_, { email }, __) => {
            const error = await sendConfirmationEmail(email); // get error if there was one
            if (error) throw new Error(error);
            return true;
        },
    },

    confirmEmail: {
        type: GraphQLBoolean,
        description: "Confirm email",
        args: {
            token: { type: GraphQLString },
        },
        resolve: async (_, { token }, __) => {
            // verify token to get id
            let id;
            verifyToken(token, "confirmation", (decoded) => (id = decoded.id));

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
};

module.exports = confirmation;

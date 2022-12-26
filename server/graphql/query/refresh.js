const { GraphQLString } = require("graphql");

const { verifyToken, signToken } = require("../../api/jsonwebtoken");
const UserModel = require("../../models/User");

/**
 * GraphQL Query object for refreshing an access token
 */
const refresh = {
    refresh: {
        type: GraphQLString,
        description: "Refresh an access token",
        resolve: async (_, __, context) => {
            const cookies = context.cookies;
            if (!cookies?.jwt) throw new Error("Cookie not found");
            const refreshToken = cookies.jwt; // get the refresh token

            // evaluate jwt
            let accessToken;
            verifyToken(refreshToken, "refresh", async (decoded) => {
                const { email } = decoded;
                const foundUser = await UserModel.findOne({ email }); // get user
                if (!foundUser) throw new Error("Forbidden user");

                const permissions = Object.values(foundUser.permissions); // get user's permissions

                // create new access token
                const newAccessToken = signToken(
                    { email, permissions },
                    "access"
                );

                accessToken = newAccessToken;
            });
            return accessToken;
        },
    },
};

module.exports = refresh;

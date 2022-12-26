const { GraphQLString } = require("graphql");
const {
    signAccessToken,
    verifyRefreshToken,
} = require("../../api/jsonwebtoken");
const UserModel = require("../../models/User");

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
            verifyRefreshToken(refreshToken, async (decoded) => {
                const { email } = decoded;
                const foundUser = await UserModel.findOne({ email }); // get user
                if (!foundUser) throw new Error("Forbidden user");

                const permissions = Object.values(foundUser.permissions); // get user's permissions

                // create new access token
                const newAccessToken = signAccessToken({ email, permissions });

                accessToken = newAccessToken;
            });
            return accessToken;
        },
    },
};

module.exports = refresh;

import { verifyToken, signToken } from "../../api/jsonwebtoken";
import UserModel from "../../models/User";
import UserType from "../types/User";

/**
 * GraphQL Query object for refreshing an access token
 */
const refresh = {
    refresh: {
        type: UserType,
        description: "Refresh an access token",
        resolve: async (_: any, __: any, context: any) => {
            const cookies = context.cookies;
            if (!cookies?.jwt) throw new Error("Cookie not found");
            const refreshToken = cookies.jwt; // get the refresh token

            // evaluate jwt
            let user: any | undefined;
            await verifyToken(refreshToken, "refresh", async (decoded) => {
                const { email } = decoded;
                const foundUser = await UserModel.findOne({ email }); // get user
                if (!foundUser) throw new Error("Forbidden user");

                const permissions = Object.values(foundUser.permissions); // get user's permissions

                // create new access token
                const newAccessToken = signToken(
                    { email, permissions },
                    "access"
                );
                 
                foundUser.accessToken = newAccessToken;
                user = foundUser;
            });
            return user;
        },
    },
};

export default refresh;

import { GraphQLList } from "graphql";

import { verifyToken } from "../../api/jsonwebtoken.js";
import UserModel from "../../models/User.js";
import UserType from "../types/User.js";

/**
 * GraphQL Query object for getting all users
 */
const users = {
    users: {
        type: new GraphQLList(UserType),
        description: "List of users",
        resolve: async (_: any, __: any, context: any) => {
            const token = context.headers.cookie?.split("=")[1]; // get jwt
            if (!token) throw new Error("Unauthorised");

            await verifyToken(token, "refresh", () => {}, [
                Number(process.env.ADMIN_PERMISSION),
            ]);

            return (await UserModel.find({})).map((user) => ({
                // @ts-ignore
                ...user._doc,
                dateCreated: JSON.stringify(user.dateCreated),
            }));
        },
    },
};

export default users;

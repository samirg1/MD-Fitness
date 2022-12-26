import { GraphQLList } from "graphql";

import UserType from "../types/User";
import UserModel from "../../models/User";
import { verifyToken } from "../../api/jsonwebtoken";

/**
 * GraphQL Query object for getting all users
 */
const users = {
    users: {
        type: new GraphQLList(UserType),
        description: "List of users",
        resolve: (_: any, __: any, context: any) => {
            const authorisationHeader =
                context.headers.authorisation || context.headers.Authorisation; // get authorisation header
            if (!authorisationHeader?.startsWith("Bearer "))
                throw new Error("Unauthorised");

            const token = authorisationHeader.split(" ")[1]; // get and verify token
            verifyToken(token, "access", () => {}, [
                Number(process.env.ADMIN_PERMISSION),
            ]);
            return UserModel.find({});
        },
    },
};

export default users;

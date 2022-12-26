const { GraphQLList } = require("graphql");

const UserType = require("../types/User");
const UserModel = require("../../models/User");
const { verifyToken } = require("../../api/jsonwebtoken");

/**
 * GraphQL Query object for getting all users
 */
const users = {
    users: {
        type: new GraphQLList(UserType),
        description: "List of users",
        resolve: (_, __, context) => {
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

module.exports = users;

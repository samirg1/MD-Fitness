const { GraphQLList } = require("graphql");

const UserType = require("../types/User");
const UserModel = require("../../models/User");
const { verifyAccessToken } = require("../../api/jsonwebtoken");

/**
 * GraphQL Query object for getting all users
 */
const users = {
    users: {
        type: new GraphQLList(UserType),
        description: "List of users",
        resolve: (_, __, context) => {
            verifyAccessToken(context, () => {}, [
                Number(process.env.ADMIN_PERMISSION),
            ]);
            return UserModel.find({});
        },
    },
};

module.exports = users;

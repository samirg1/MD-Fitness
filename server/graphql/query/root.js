const { GraphQLObjectType, GraphQLList } = require("graphql");

const UserType = require("../types/User");
const UserModel = require("../../models/User");
const verifyAccessToken = require("../../middles/verifyAccessToken");

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => {
        return {
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
    },
});

module.exports = RootQueryType;
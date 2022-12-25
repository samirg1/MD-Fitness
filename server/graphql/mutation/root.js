const { GraphQLObjectType, GraphQLList } = require("graphql");

const UserType = require("../types/User");
const UserModel = require("../../models/User");
const verifyAccessToken = require("../../middles/verifyAccessToken");

const MutationQueryType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => {
        return {
            
        };
    },
});

module.exports = MutationQueryType;

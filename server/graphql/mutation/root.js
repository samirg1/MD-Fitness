const { GraphQLObjectType } = require("graphql");
const authentication = require("./authentication");

const MutationQueryType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({ ...authentication }),
});

module.exports = MutationQueryType;

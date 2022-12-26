const { GraphQLObjectType } = require("graphql");
const authentication = require("./authentication");

/**
 * Root type for GraphQL mutations.
 */
const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({ ...authentication }),
});

module.exports = RootMutationType;

const { GraphQLObjectType } = require("graphql");

const authentication = require("./authentication");
const confirmation = require("./confirmation");

/**
 * Root type for GraphQL mutations.
 */
const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({ ...authentication, ...confirmation }),
});

module.exports = RootMutationType;

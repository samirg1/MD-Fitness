const { GraphQLObjectType } = require("graphql");

const AuthenticationType = require("./authentication");
const ConfirmationType = require("./confirmation");

/**
 * Root type for GraphQL mutations.
 */
const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        authentication: { type: AuthenticationType, resolve: () => true },
        confirmation: { type: ConfirmationType, resolve: () => true },
    }),
});

module.exports = RootMutationType;

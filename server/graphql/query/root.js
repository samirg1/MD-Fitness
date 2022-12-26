const { GraphQLObjectType } = require("graphql");

const refresh = require("./refresh");
const users = require("./users");

/**
 * Root type for GraphQL queries.
 */
const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({ ...users, ...refresh }),
});

module.exports = RootQueryType;

const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const RootQueryType = require("./query/root");
const RootMutationType = require("./mutation/root");

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

const graphQlMiddleware = graphqlHTTP({
    schema: schema,
    graphiql: true,
});

module.exports = graphQlMiddleware;

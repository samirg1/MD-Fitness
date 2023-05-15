import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "graphql";

import RootMutationType from "../graphql/mutation/root.js";
import RootQueryType from "../graphql/query/root.js";

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

export default graphqlHTTP({
    schema: schema,
    graphiql: true,
});

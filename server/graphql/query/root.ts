import { GraphQLObjectType } from "graphql";
import products from "./products";

import refresh from "./refresh";
import users from "./users";

/**
 * Root type for GraphQL queries.
 */
const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",

    fields: () => ({ ...users, ...refresh, ...products }),
});

export default RootQueryType;

import { GraphQLObjectType } from "graphql";

import products from "./products.js";
import refresh from "./refresh.js";
import users from "./users.js";

/**
 * Root type for GraphQL queries.
 */
const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",

    fields: () => ({ ...users, ...refresh, ...products }),
});

export default RootQueryType;

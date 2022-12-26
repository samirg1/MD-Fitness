import { GraphQLObjectType } from "graphql";

import refresh from "./refresh";
import users from "./users";

/**
 * Root type for GraphQL queries.
 */
const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({ ...users, ...refresh }),
});

export default RootQueryType;

import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Represents a user of the application",
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        permissions: { type: GraphQLNonNull(GraphQLList(GraphQLInt)) },
        purchases: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
        dateCreated: { type: GraphQLNonNull(GraphQLString) },
        activated: { type: GraphQLNonNull(GraphQLBoolean) },
        accessToken: { type: GraphQLString },
    }),
});

export default UserType;

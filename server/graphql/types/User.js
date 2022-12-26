const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} = require("graphql");

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Represents a user of the application",
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        permissions: { type: GraphQLNonNull(GraphQLList(GraphQLInt)) },
        dateCreated: { type: GraphQLNonNull(GraphQLString) },
        activated: { type: GraphQLNonNull(GraphQLBoolean) },
    }),
});

module.exports = UserType;

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Represents a user of the application",
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        permissions: { type: GraphQLList(GraphQLInt) },
        dateCreated: { type: GraphQLString },
        activated: { type: GraphQLBoolean },
    }),
});

module.exports = UserType;

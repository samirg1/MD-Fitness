const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLList } = require("graphql");

const UserType = require("./User");
const UserModel = require("../models/User");
const verifyAccessToken = require("../middles/verifyAccessToken");

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => {
        return {
            users: {
                type: new GraphQLList(UserType),
                description: "List of users",
                resolve: (_, __, context) => {
                    verifyAccessToken(context, () => {}, [999]);
                    return UserModel.find({});
                },
            },
        };
    },
});

const schema = new GraphQLSchema({
    query: RootQueryType,
});

const graphQlMiddleware = graphqlHTTP({
    schema: schema,
    // context: {
    //     headers: {
    //         authorisation:
    //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNyZ3VwdGFAYmlncG9uZC5jb20iLCJwZXJtaXNzaW9ucyI6WzEsOTk5XSwiaWF0IjoxNjcxNjY5OTUzLCJleHAiOjE2NzE2NzA1NTN9._C3ZakPHgIx8vCGUnG8oPrphhSKzzlJKF9PEtQPp1Ys",
    //     },
    // },
    graphiql: true,
});

module.exports = graphQlMiddleware;

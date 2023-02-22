import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { addUsersPurchase } from "../../api/stripe";

/**
 * GraphQL Query object for accessing purchases
 */
const PurchaseType = new GraphQLObjectType({
    name: "Purchases",
    description: "Dealing with user's purchases",
    fields: () => ({
        addPurchase: {
            type: GraphQLBoolean,
            description: "Add a purchase to a user",
            args: {
                sessionId: { type: GraphQLNonNull(GraphQLString) },
                productId: { type: GraphQLNonNull(GraphQLString) },
                userEmail: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, { sessionId, productId, userEmail }) => {
                await addUsersPurchase(sessionId, productId, userEmail);
                return true;
            },
        },
    }),
});

export default PurchaseType;

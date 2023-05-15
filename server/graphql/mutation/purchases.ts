import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

import { addUsersPurchase } from "../../api/stripe.js";

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
                emailHtml: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (
                _,
                { sessionId, productId, userEmail, emailHtml }
            ) => {
                await addUsersPurchase(
                    sessionId,
                    productId,
                    userEmail,
                    emailHtml
                );
                return true;
            },
        },
    }),
});

export default PurchaseType;

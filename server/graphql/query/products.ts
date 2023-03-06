import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";

import { getProductsForUser, getProducts } from "../../api/stripe";
import ProductType from "../types/Product";

/**
 * GraphQL Query object for getting all products
 */
const products = {
    products: {
        type: new GraphQLList(ProductType),
        description: "List of products",
        resolve: async () => await getProducts(),
    },
    userProducts: {
        type: new GraphQLList(ProductType),
        description: "List of products for a specific user",
        args: {
            ids: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
            email: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_: any, args: any) =>
            await getProductsForUser(args.ids, args.email),
    },
};

export default products;

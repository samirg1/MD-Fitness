import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";

import { getProductById, getProducts } from "../../api/stripe";
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
    product: {
        type: ProductType,
        description: "A product",
        args: { id: { type: GraphQLNonNull(GraphQLString) } },
        resolve: async (_: any, args: any) => await getProductById(args.id),
    }
};

export default products;

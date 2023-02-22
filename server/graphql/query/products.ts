import { GraphQLList } from "graphql";

import { getProducts } from "../../api/stripe";
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
};

export default products;

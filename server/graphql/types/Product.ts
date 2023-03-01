import {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

const ProductType = new GraphQLObjectType({
    name: "Product",
    description: "Represents a product being sold by the application",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        price_id: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        metadata: { type: GraphQLNonNull(GraphQLString) },
    }),
});

export default ProductType;
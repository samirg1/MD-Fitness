const stripe = require("stripe")(process.env.STRIPE_API);

type TProduct = {
    id: string;
    default_price: {
        id: string;
        unit_amount: number;
    };
    description: string;
    name: string;
};

const getProducts = async () => {
    const { data } = (await stripe.products.list({
        expand: ["data.default_price"],
    })) as { data: Array<TProduct> };

    return data.map(({ id, default_price, description, name }) => ({
        id,
        price_id: default_price.id,
        price: default_price.unit_amount,
        description,
        name,
    }));
};

export default getProducts;

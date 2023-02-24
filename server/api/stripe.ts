import UserModel from "../models/User";

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

/**
 * Get all products currently available.
 * @returns The products available.
 */
export const getProducts = async () => {
    const { data } = (await stripe.products.list({
        expand: ["data.default_price"], active: true
    })) as { data: Array<TProduct> };

    return data.map(({ id, default_price, description, name }) => ({
        id,
        price_id: default_price.id,
        price: default_price.unit_amount,
        description,
        name,
    }));
};

/**
 * Add a purchase to a user account.
 * @param sessionId The id of the checkout session the user paid in.
 * @param productId The product id of the product the user bought.
 * @param userEmail The email address of the user.
 */
export const addUsersPurchase = async (sessionId: string, productId: string, userEmail: string) => {
    const { payment_intent } = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["payment_intent"]});

    if (payment_intent.metadata.fulfilled) return;
    await stripe.paymentIntents.update(payment_intent.id, { metadata: { fulfilled: true } });

    const user = await UserModel.findOne({ email: userEmail });
    if (!user) return;
    if (user.purchases.includes(productId)) return;

    user.purchases.push(productId);
    await user.save();
};

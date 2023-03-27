import UserModel from "../models/User";
import { sendPurchaseConfirmationEmail } from "./mailer";

const stripe = require("stripe")(process.env.STRIPE_API);

type TProduct = {
    id: string;
    default_price: {
        id: string;
        unit_amount: number;
    };
    metadata: { [key: string]: string };
    description: string;
    name: string;
};

/**
 * Get all products currently available.
 * @returns The products available.
 */
export const getProducts = async () => {
    const { data } = (await stripe.products.list({
        expand: ["data.default_price"],
        active: true,
    })) as { data: Array<TProduct> };

    const publicProducts = data.filter(({ metadata }) => !metadata.client);

    return publicProducts.map(({ id, default_price, description, name }) => ({
        id,
        price_id: default_price.id,
        price: default_price.unit_amount,
        description,
        name,
    }));
};

/**
 * Get the products specifc to a user.
 * @param ids The ids of the products to retrieve.
 * @param email The user's email
 * @returns The products that the user has access to.
 */
export const getProductsForUser = async (ids: string[], email: string) => {
    const { data } = (await stripe.products.list()) as {
        data: Array<TProduct>;
    };

    const usersProducts = data.filter(
        ({ id, metadata }) => ids.includes(id) || metadata.client === email
    );

    return usersProducts.map(({ id, description, name, metadata }) => ({
        id,
        description,
        name,
        metadata: JSON.stringify(metadata),
    }));
};

/**
 * Add a purchase to a user account.
 * @param sessionId The id of the checkout session the user paid in.
 * @param productId The product id of the product the user bought.
 * @param userEmail The email address of the user.
 */
export const addUsersPurchase = async (
    sessionId: string,
    productId: string,
    userEmail: string,
    emailHtml: string
) => {
    const { payment_intent } = await stripe.checkout.sessions.retrieve(
        sessionId,
        { expand: ["payment_intent"] }
    );

    if (payment_intent.metadata.fulfilled) return;
    await stripe.paymentIntents.update(payment_intent.id, {
        metadata: { fulfilled: true },
    });

    const user = await UserModel.findOne({ email: userEmail });
    if (!user) return;
    if (user.purchases.includes(productId)) return;

    user.purchases.push(productId);
    user.save();

    const { name } = await stripe.products.retrieve(productId);
    sendPurchaseConfirmationEmail(userEmail, emailHtml, name);
};

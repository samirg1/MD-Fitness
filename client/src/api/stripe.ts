import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

/**
 * Singleton method to get an instance of Stripe.
 * @returns The stripe promise to get an instance of Stripe.
 */
export const getStripe = async (): Promise<Stripe | null> => {
    if (stripePromise === undefined) {
        stripePromise = await loadStripe(
            process.env.REACT_APP_STRIPE_KEY as string
        );
    }
    return stripePromise;
};

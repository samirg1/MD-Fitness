import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useState } from "react";

let stripePromise: Promise<Stripe | null> | undefined;

/**
 * Singleton method to get an instance of Stripe.
 * @returns The stripe promise to get an instance of Stripe.
 */
const getStripe = (): Promise<Stripe | null> => {
    if (stripePromise === undefined) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY as string);
    }
    return stripePromise;
};

const StripeHook = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const checkoutOptions = {
        lineItems: [
            {
                price: "price_1MAB8ILtADD0fUnHx8a42uJK", // the price id from the stripe webpage
                quantity: 1,
            },
        ],
        mode: "payment" as "payment" | "subscription" | undefined,
        successUrl: `${window.location.origin}`,
        cancelUrl: `${window.location.origin}`,
    };

    /**
     * Redirect the current page to the Stripe checkout endpoint.
     */
    const redirectToCheckout = async (): Promise<void> => {
        setIsLoading(true);

        const stripe = await getStripe();
        if (stripe === null) {
            alert("Cannot connect to stripe");
            return setIsLoading(false);
        }
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        if (error) setError(error.message);
    };

    if (error) alert(error);

    return { isLoading, redirectToCheckout };
};

export default StripeHook;

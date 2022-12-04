import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useState } from "react";

let stripePromise: Promise<Stripe | null> | undefined;

const getStripe = () => {
    if (stripePromise === undefined) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY as string);
    }
    return stripePromise;
};

export const StripeComponent = () => {
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
        successUrl: `${window.location.origin}`, // TODO when payment is successful
        cancelUrl: `${window.location.origin}`, // TODO when payment is cancelled
    };

    const redirectToCheckout = async () => {
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

    return (
        <div>
            <button onClick={redirectToCheckout} disabled={isLoading}>
                {isLoading ? "Loading..." : "Buy"}
            </button>
        </div>
    );
};

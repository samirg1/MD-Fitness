import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

let stripePromise;

const getStripe = () => {
    if (!stripePromise)
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    return stripePromise;
};

export const StripeComponent = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const checkoutOptions = {
        lineItems: [
            {
                price: "price_1MAB8ILtADD0fUnHx8a42uJK", // the price id from the stripe webpage
                quantity: 1,
            },
        ],
        mode: "payment",
        successUrl: `${window.location.origin}`, // TODO when payment is successful
        cancelUrl: `${window.location.origin}`, // TODO when payment is cancelled
    };

    const redirectToCheckout = async () => {
        setIsLoading(true);

        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        if (error) setError(error.message);

        setIsLoading(false);
    };

    if (error) alert(error);

    return (
        <div>
            <button onClick={redirectToCheckout} disabled={isLoading}>{ isLoading ? "Loading..." : "Buy"}</button>
        </div>
    );
};

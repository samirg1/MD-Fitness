import { useState } from "react";
import { getStripe } from "../api/stripe";

/**
 * Stripe hook.
 * @returns Function to redirect users to checkout and boolean whether this is loading or not.
 */
const useStripe = () => {
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

export default useStripe;

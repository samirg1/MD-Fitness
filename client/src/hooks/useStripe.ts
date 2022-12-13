import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStripe } from "../api/stripe";
import useSnackBar from "./useSnackBar";

/**
 * Stripe hook.
 * @returns Function to redirect users to checkout and boolean whether this is loading or not.
 */
const useStripe = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { setOptions: setSnackBarOptions } = useSnackBar();

    /**
     * Redirect the current page to the Stripe checkout endpoint.
     */
    const redirectToCheckout = async (): Promise<void> => {
        setIsLoading(true);

        // TODO: when buying an item, get the price id from database
        // checkout options for the checkout
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

        const stripe = await getStripe();
        if (stripe === null) {
            setSnackBarOptions({
                message: "Unable to connect to stripe",
                type: "error",
            });
            navigate("/");
            return setIsLoading(false);
        }
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        if (error) {
            setSnackBarOptions({
                message: "Checkout error: " + error.message,
                type: "error",
            });
            navigate("/");
        };
    };

    return { isLoading, redirectToCheckout };
};

export default useStripe;

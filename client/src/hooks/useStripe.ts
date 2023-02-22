import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { graphQLRequest } from "../api/server";
import { getStripe } from "../api/stripe";
import useSnackBar from "./useSnackBar";

export type TProduct = {
    id: string;
    price_id: string;
    price: number;
    description: string;
    name: string;
};

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
     * @param priceID The ID of the purchase item.
     * @param productID The ID of the product.
     * @param customerEmail The email address of the customer.
     * @param currentPagePath The current page the user was on ('/programs', '/about' etc.).
     */
    const redirectToCheckout = async (
        priceID: string,
        productID: string,
        customerEmail: string,
        currentPagePath: string = ""
    ): Promise<void> => {
        setIsLoading(true);

        // checkout options for the checkout
        const checkoutOptions = {
            lineItems: [{ price: priceID, quantity: 1 }],
            mode: "payment" as "payment" | "subscription" | undefined,
            successUrl: `${window.location.origin}/account?session_id={CHECKOUT_SESSION_ID}&product_id=${productID}`,
            cancelUrl: `${window.location.origin}${currentPagePath}`,
            customerEmail,
        };

        const stripe = await getStripe();
        if (stripe === null) {
            setSnackBarOptions({
                message: "Unable to connect to Stripe",
                type: "error",
            });
            navigate(currentPagePath);
            return setIsLoading(false);
        }
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        if (error) {
            setSnackBarOptions({
                message: "Checkout error: " + error.message,
                type: "error",
            });
            navigate(currentPagePath);
        }
    };

    /**
     * Retrieve the currently available products.
     * @returns The currently available products.
     */
    const getProducts = async () => {
        let products: TProduct[] = [];
        await graphQLRequest<{ products: TProduct[] }>(
            `query {
                products {
                    id
                    price_id
                    price
                    description
                    name
                }
            }`,
            (data) => (products = data.products)
        );
        return products;
    };

    /**
     * Add a new product to the list of user's purchases.
     * @param sessionId The checkout session the user bought the product in.
     * @param productId The product the user bought.
     * @param userEmail The user's email address.
     */
    const addUserPurchase = async (sessionId: string, productId: string, userEmail: string) =>{
        await graphQLRequest(
            `mutation {
                purchases {
                    addPurchase(sessionId: "${sessionId}", productId: "${productId}", userEmail: "${userEmail}")
                }
            }`
        );
        setSnackBarOptions({
            message: "Purchase successfull!",
            type: "success",
        });
    }

    return { isLoading, redirectToCheckout, getProducts, addUserPurchase };
};

export default useStripe;

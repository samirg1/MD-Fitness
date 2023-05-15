import { useNavigate } from "react-router-dom";
import { graphQLRequest } from "../api/server";
import { getStripe } from "../api/stripe";
import { EmailType, renderEmail } from "../components/emails/renderEmail";
import useSnackBar from "./useSnackBar";

/**
 * Stripe hook.
 * @returns Function to redirect users to checkout and boolean whether this is loading or not.
 */
const useStripe = () => {
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
            return navigate(currentPagePath);
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
        let products: TSellProduct[] = [];
        await graphQLRequest<{ products: TSellProduct[] }>(
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
     * Get the products specifc to a user.
     * @param ids The ids of the products to retrieve.
     * @param email The email address of the user.
     * @returns The products that the user has access to.
     */
    const getProductsForUser = async (ids: string[], email: string) => {
        let products: TViewProduct[] = [];
        await graphQLRequest<{
            userProducts: (Omit<TViewProduct, "metadata"> & {
                metadata: string;
            })[];
        }>(
            `query {
                userProducts(ids: ${JSON.stringify(ids)}, email: "${email}") {
                    id
                    description
                    name
                    metadata
                }
            }`,
            (data) => {
                products = data.userProducts.map(
                    ({ id, description, name, metadata }) => ({
                        id,
                        description,
                        name,
                        metadata: JSON.parse(
                            metadata
                        ) as TViewProduct["metadata"],
                    })
                );
            }
        );
        return products;
    };

    /**
     * Add a new product to the list of user's purchases.
     * @param sessionId The checkout session the user bought the product in.
     * @param productId The product the user bought.
     * @param userEmail The user's email address.
     */
    const addUserPurchase = async (
        sessionId: string,
        productId: string,
        userEmail: string
    ) => {
        const purchaseConfirmationEmailHtml = renderEmail(
            EmailType.purchaseConfirmation
        );
        await graphQLRequest(
            `mutation {
                purchases {
                    addPurchase(sessionId: "${sessionId}", productId: "${productId}", userEmail: "${userEmail}", emailHtml: "${purchaseConfirmationEmailHtml}")
                }
            }`
        );
        setSnackBarOptions({
            message: "Purchase successfull!",
            type: "success",
        });
    };

    return {
        redirectToCheckout,
        getProducts,
        getProductsForUser,
        addUserPurchase,
    };
};

export default useStripe;

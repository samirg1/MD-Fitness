import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import useSnackBar from "../../hooks/useSnackBar";
import useStripe from "../../hooks/useStripe";
import Card from "../Card";
import Loader from "../Loader";
import PageTitle from "../PageTitle";

type TProductDisplay = Pick<TSellProduct, "id" | "description"> & {
    title: string;
    navTitle: string;
    onClick: () => Promise<void>;
    purchased: boolean;
};

/**
 * Main component for the programs page.
 */
const Programs = () => {
    const { authentication } = useAuthentication();
    const navigate = useNavigate();
    const { setOptions: setSnackBarOptions } = useSnackBar();

    const { redirectToCheckout, getProducts } = useStripe();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<TProductDisplay[]>([]);

    /**
     * Convert a number into a price string.
     * @param amount The amount to convert.
     * @returns The converted amount as a money string.
     */
    const formatNumberAsMoney = (amount: number): string => {
        return new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
        }).format(amount);
    };

    // use effect to get the current products
    useEffect(() => {
        setIsLoading(true);

        const getAllProducts = async () => {
            const allProducts = await getProducts();
            setProducts(
                allProducts
                    .map(({ name, description, id, price_id, price }) => {
                        const purchased: boolean =
                            authentication?.purchases.includes(id) ?? false;
                        return {
                            id,
                            // if the product is purchased, don't show the price
                            title:
                                name +
                                (!purchased
                                    ? ` - ${formatNumberAsMoney(price / 100)}`
                                    : ""),
                            description,
                            navTitle: purchased ? "View" : "Buy",
                            onClick: handleProductClick(
                                price_id,
                                id,
                                purchased
                            ),
                            purchased: purchased,
                        };
                    })
                    .sort((a, b) => Number(a.purchased) - Number(b.purchased)) // sort purchased products to the bottom
            );
            setIsLoading(false);
        };

        getAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Handle a product click.
     * @param priceId The price identifier of the program.
     * @param productId The program product identifier.
     */
    const handleProductClick =
        (
            priceId: string,
            productId: string,
            purchased: boolean
        ): (() => Promise<void>) =>
        async () => {
            if (!authentication) {
                setSnackBarOptions({
                    message: "You must be logged in to purchase this product",
                    type: "info",
                });
                navigate("/login-signup", {
                    state: { from: { pathname: "/programs" } },
                });
                return;
            }

            if (purchased)
                return navigate("/account", { state: { to: productId } });

            setIsLoading(true);
            await redirectToCheckout(
                priceId,
                productId,
                authentication.email,
                "/programs"
            );
            setIsLoading(false);
        };

    return (
        <>
            <Loader isLoading={isLoading} />
            <Box
                style={{
                    position: "absolute",
                    top: "15%",
                    left: "10%",
                    right: "10%",
                }}
            >
                <PageTitle size="small">PROGRAMS</PageTitle>
                {products.length === 0 ? (
                    <p style={{ color: "white" }}>
                        No public programs to display.
                    </p>
                ) : (
                    <ul style={{ listStyleType: "none", paddingLeft: "0px" }}>
                        {products.map(
                            ({ id, title, description, navTitle, onClick }) => (
                                <li key={id} style={{ paddingBottom: "20px" }}>
                                    <Card
                                        title={title}
                                        navTitle={navTitle}
                                        onClick={onClick}
                                        disabled={isLoading}
                                    >
                                        {description}
                                    </Card>
                                </li>
                            )
                        )}
                    </ul>
                )}
            </Box>
        </>
    );
};

export default Programs;

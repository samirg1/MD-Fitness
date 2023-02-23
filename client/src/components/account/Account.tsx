import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import useStripe from "../../hooks/useStripe";
import PageTitle from "../PageTitle";

/**
 * Main page for the user's account and profile.
 */
const Account = () => {
    const { authentication } = useAuthentication();
    const { addUserPurchase } = useStripe();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const session_id = searchParams.get("session_id");
        const product_id = searchParams.get("product_id");
        if (session_id && product_id && authentication) {
            addUserPurchase(session_id, product_id, authentication.email);
            setSearchParams();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <PageTitle size="small">ACCOUNT</PageTitle>
            <div style={{ color: "white" }}>
                This is the account page for {authentication?.name}{" "}
                {authentication?.purchases}
            </div>
        </>
    );
};

export default Account;

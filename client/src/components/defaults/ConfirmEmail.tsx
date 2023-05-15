import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import Loader from "../Loader";
import DefaultPage from "./DefaultPage";

/**
 * Page that is shown when user is confirming an email.
 */
const ConfirmEmail = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { token } = useParams();
    const { confirmEmail } = useAccount();

    useEffect(() => {
        /**
         * Confirm an email of the user.
         */
        const confirm = async () => {
            const response = await confirmEmail(token ?? "");
            if (!response)
                localStorage.setItem("verification", JSON.stringify(false));
            setError(response);
            setLoading(false);
        };

        confirm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Loader isLoading={loading} />
            <DefaultPage
                displayText={
                    error || "Email confirmed! You can close this tab."
                }
            />
        </>
    );
};

export default ConfirmEmail;

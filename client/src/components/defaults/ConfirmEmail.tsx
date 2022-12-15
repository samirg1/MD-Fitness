import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postRequest } from "../../api/server";
import Loader from "../Loader";
import DefaultPage from "./DefaultPage";

/**
 * Page that is shown when user is confirming an email.
 */
const ConfirmEmail = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { token } = useParams();
    const CONFIRM_URL = `/user/confirmEmail/${token}`;

    useEffect(() => {
        /**
         * Confirm an email of the user.
         */
        const confirm = async () => {
            const response = await postRequest(CONFIRM_URL, {}, () => {});
            if (!response)
                localStorage.setItem("verification", JSON.stringify(false));
            setError(response);
            setLoading(false);
        };

        confirm();
    }, [CONFIRM_URL]);

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

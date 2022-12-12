import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import Loader from "../Loader";
import DefaultPage from "./DefaultPage";

const ConfirmEmail = () => {
    const { userID } = useParams();
    const CONFIRM_URL = `/user/confirmEmail/${userID}`;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const confirm = async () => {
            try {
                await axios.post(CONFIRM_URL, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json'}
                });
            } catch (error: any) {
                setError(error.response.data);
            }
            setLoading(false);
        };

        confirm();
    }, [CONFIRM_URL]);

    return (
        <>
            <Loader isLoading={loading} />
            <DefaultPage displayText={error || "Email confirmed! You can close this tab."} />
        </>
    );
};

export default ConfirmEmail;

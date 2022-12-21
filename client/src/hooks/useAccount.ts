import { useNavigate } from "react-router-dom";
import { postRequest } from "../api/server";
import useAuthentication from "./useAuthentication";
import useSnackBar from "./useSnackBar";

// server urls
const SIGNUP_URL = "/user/register";
const LOGIN_URL = "/user/login";
const LOGOUT_URL = "/user/logout";
const SEND_CONFIRM_URL = "/user/confirmation/send";
const CONFIRM_URL = "/user/confirmation/confirm/"

/**
 * Login object type.
 */
export type TLogin = {
    email: string;
    password: string;
};

/**
 * Signup object type.
 */
export type TSignup = {
    name: string;
    email: string;
    password: string;
};

/**
 * Hook to use account functionality.
 * @returns Functions for logging in, signing up and logging out.
 */
const useAccount = () => {
    const { setAuthentication } = useAuthentication();
    const { setOptions: setSnackBarMessage } = useSnackBar();
    const navigate = useNavigate();

    /**
     * Sign a user up.
     * @param payload The signup details.
     * @returns The error if any occured.
     */
    const signup = async (payload: TSignup): Promise<string | null> => {
        return await postRequest(SIGNUP_URL, payload, (response) => {
            sendConfirmationEmail(response.data.email);
        });
    };

    /**
     * Log a user in.
     * @param payload The login details.
     * @returns The error if any occured.
     */
    const login = async (payload: TLogin): Promise<string | null> => {
        return await postRequest(LOGIN_URL, payload, (response) => {
            setAuthentication(response.data);
        });
    };

    /**
     * Log a user out.
     * @returns The error if any occured.
     */
    const logout = async (): Promise<string | null> => {
        return await postRequest(LOGOUT_URL, {}, () => {
            setAuthentication(null);
            setSnackBarMessage({
                message: "Logout successful",
                type: "success",
            });
            navigate("/");
        });
    };

    /**
     * Send confirmation email.
     * @returns The error if any occured.
     */
    const sendConfirmationEmail = async (email: string): Promise<string | null> => {
        return await postRequest(SEND_CONFIRM_URL, { email }, () => {});
    };

    /**
     * Confirm user's email.
     * @param token The token that contains the user's id.
     * @returns The error if any occured.
     */
    const confirmEmail = async (token: string) => {
        return await postRequest(CONFIRM_URL + token, {}, () => { });
    }

    return { signup, login, logout, sendConfirmationEmail, confirmEmail };
};

export default useAccount;

import { useNavigate } from "react-router-dom";
import { postRequest } from "../api/server";
import useAuthentication from "./useAuthentication";
import useSnackBar from "./useSnackBar";

const SIGNUP_URL = "/user/register";
const LOGIN_URL = "/user/login";
const LOGOUT_URL = "/user/logout";
const CONFIRMATION_URL = "/user/confirmation";

export type TLogin = {
    email: string;
    password: string;
}

export type TSignup = {
    name: string;
    email: string;
    password: string;
}

const useAccount = () => {
    const { setAuthentication } = useAuthentication();
    const { setOptions: setSnackBarMessage } = useSnackBar();
    const navigate = useNavigate();

    const signup = async (payload: TSignup) => {
        return await postRequest(SIGNUP_URL, payload, (response) => {
            confirmEmail(response.data._id);
        });
    };

    const login = async (payload: TLogin) => {
        return await postRequest(LOGIN_URL, payload, (response) => {
            setAuthentication(response.data);
        });
    };

    const logout = async () => {
        return await postRequest(LOGOUT_URL, {}, () => {
            setAuthentication(null);
            setSnackBarMessage({
                message: "Logout successful",
                type: "success"
            });
            navigate("/");
        });
    };

    const confirmEmail = async (id: string) => {
        return await postRequest(CONFIRMATION_URL, { id }, () => { });
    };
     
    return { signup, login, logout };
};

export default useAccount;
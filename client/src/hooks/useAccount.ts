import { useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const SIGNUP_URL = "/user/register";
const LOGIN_URL = "user/login";

type TLogin = {
    email: string;
    password: string;
}

type TSignup = {
    name: string;
    email: string;
    password: string;
}

const useAccount = () => {
    const { setAuthentication } = useContext(AuthContext);

    const signup = async (payload: TSignup) => {
        try {
            const response = await axios.post(
                SIGNUP_URL,
                JSON.stringify(payload),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response));
        } catch (error: any) {
            if (!error?.message) return "server response lost";
            return error.response.data;
        }
        return '';
    }

    const login = async (payload: TLogin) => {
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify(payload),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            const { name, email, accessToken, permissions } = response?.data;
            setAuthentication({ name, email, permissions, accessToken });
        } catch (error: any) {
            if (!error?.message) return "server response lost";
            return error.response.data;
        }
        return '';
    };

    return { signup, login };
};

export default useAccount;
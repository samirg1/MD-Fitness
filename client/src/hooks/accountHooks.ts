import axios from "../api/axios";


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

const accountHooks = () => {
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
            console.log(JSON.stringify(response.data));
        } catch (error: any) {
            if (!error?.message) return "server response lost";
            return error.response.data;
        }
        return '';
    };

    return { signup, login };
};

export default accountHooks;
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
        let signupError = '';
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
            if (!error?.message) signupError = "server response lost";
            else signupError = error.response.data;
        }
        return signupError;
    }

    return { signup };
};

export default accountHooks;
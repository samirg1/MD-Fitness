import { postRequest } from "../api/server";
import useAuthentication from "./useAuthentication";

const SIGNUP_URL = "/user/register";
const LOGIN_URL = "user/login";

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

    const signup = async (payload: TSignup) => {
        return await postRequest(SIGNUP_URL, payload, (response) => {
            console.log(JSON.stringify(response));
        });
    }

    const login = async (payload: TLogin) => {
        return await postRequest(LOGIN_URL, payload, (response) => {
            setAuthentication(response.data);
        });
    };

    const logout = () => setAuthentication(null);
     
    return { signup, login, logout };
};

export default useAccount;
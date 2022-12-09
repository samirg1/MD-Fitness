import { AxiosResponse } from "axios";
import { TLogin, TSignup } from "../hooks/useAccount";
import axios from "./axios";

export const postRequest = async (url: string, payload: TLogin | TSignup, callback: (response: AxiosResponse) => void): Promise<string> => {
    try {
        const response = await axios.post(
            url,
            JSON.stringify(payload),
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        callback(response);
    } catch (error: any) {
        if (!error?.message) return "server response lost";
        if (!error.response) return "no server response";
        return error.response.data;
    }
    return '';
}

export const getRequest = async (url: string, signal: AbortSignal, callback: (response: AxiosResponse) => void): Promise<string> => {
    try {
        const response = await axios.get(
            url,
            { signal: signal, withCredentials: true },
        )
        callback(response);
    } catch (error: any) {
        if (!error?.message) return "server response lost";
        if (!error.response) return "no server response";
        return error.response.data;
    }
    return '';
}
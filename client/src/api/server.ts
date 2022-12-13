import { AxiosResponse } from "axios";
import { TLogin, TSignup } from "../hooks/useAccount";
import axios, { axiosPrivate } from "./axios";

/**
 * Post a request to server using axios.
 * @param url The url to post to.
 * @param payload The payload to send to the url.
 * @param callback The callback function to be called when the post is successful.
 * @returns String detailing the error (if any).
 */
export const postRequest = async (
    url: string,
    payload: TLogin | TSignup | {},
    callback: (response: AxiosResponse) => void
): Promise<string | null> => {
    try {
        const response = await axios.post(url, JSON.stringify(payload), {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });
        callback(response);
    } catch (error: any) {
        if (!error?.message) return "server response lost";
        if (!error.response) return "no server response";
        return error.response.data;
    }
    return null;
};

/**
 * Get private data from server using axios.
 * @param url The url to retrieve data from.
 * @param signal The signal to abort the get if necessary.
 * @param onSuccess The callback function to be called when the get is successful.
 * @param onFailure The callback function to be called when the get is unsuccessful.
 * @returns String detailing the error (if any).
 */
export const getPrivateRequest = async (
    url: string,
    signal: AbortSignal,
    onSuccess: (response: AxiosResponse) => void,
    onFailure: () => void
): Promise<void> => {
    try {
        const response = await axiosPrivate.get(url, { signal: signal });
        onSuccess(response);
    } catch (error: any) {
        if (error.code !== "ERR_CANCELED") onFailure(); // don't fail if get is cancelled
    }
};

/**
 * Get data from the server using axios.
 * @param url The url to get from.
 * @param onSuccess Callback to be called when the request is successful.
 * @param onFailure Callback to be called when the request is unsuccessful.
 */
export const getRequest = async (
    url: string,
    onSuccess: (response: AxiosResponse) => void,
    onFailure: () => void
): Promise<void> => {
    try {
        const response = await axios.get(url, {
            withCredentials: true,
        });
        onSuccess(response);
    } catch (error: any) {
        onFailure();
    }
};

import { useEffect } from "react";
import axios from "../api/axios";
import useAuthentication from "./useAuthentication";
import useRefreshToken from "./useRefreshToken";

/**
 * Hook to get an axios private instance with interceptors for private requests.
 * @returns Axios private instance with interceptors.
 */
const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { authentication } = useAuthentication();

    useEffect(() => {
        // add request interceptor
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                if (config.headers && !config.headers["authorisation"]) {
                    config.headers[
                        "authorisation"
                    ] = `Bearer ${authentication?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // add a response interceptor
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const previousRequest = error?.config;
                if (error?.response?.status === 403 && !previousRequest.sent) {
                    previousRequest.sent = true;
                    const newAccessToken = await refresh();
                    previousRequest.headers[
                        "authorisation"
                    ] = `Bearer ${newAccessToken}`;
                    return axios(previousRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // remove both interceptors during cleanup
            axios.interceptors.response.eject(responseInterceptor);
            axios.interceptors.request.eject(requestInterceptor);
        };
    }, [authentication, refresh]);

    return axios;
};

export default useAxiosPrivate;

import { useEffect } from 'react';
import { axiosPrivate } from "../api/axios";
import useAuthentication from './useAuthentication';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { authentication } = useAuthentication();

    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                if (config.headers && !config.headers['authorisation']) {
                    config.headers['authorisation'] = `Bearer ${authentication?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const previousRequest = error?.config;
                if (error?.response?.status === 403 && !previousRequest.sent) {
                    previousRequest.sent = true;
                    const newAccessToken = await refresh();
                    previousRequest.headers["authorisation"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(previousRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        }
    }, [authentication, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
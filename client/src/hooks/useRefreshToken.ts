import { getRequest } from "../api/server";
import { TAuthentication } from "../context/AuthProvider";
import useAuthentication from "./useAuthentication";

const REFRESH_URL = "/refresh";

/**
 * Hook to get a new access token if the current refresh token is not expired.
 * @returns Function to get a new access token.
 */
const useRefreshToken = () => {
    const { setAuthentication } = useAuthentication();

    /**
     * Get a new access token if the current refresh token is not expired.
     * @returns New access token.
     */
    const refresh = async (): Promise<string | void> => {
        let accessToken: string = "";

        await getRequest(
            REFRESH_URL,
            (response) => {
                accessToken = response.data.accessToken;
                setAuthentication((prev) => {
                    return {
                        ...prev,
                        name: response.data.name,
                        permissions: response.data.permissions,
                        accessToken: accessToken,
                    } as TAuthentication;
                });
            },
            () => {}
        );

        return accessToken;
    };
    return refresh;
};

export default useRefreshToken;

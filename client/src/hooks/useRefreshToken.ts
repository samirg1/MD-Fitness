import { graphQLRequest } from "../api/server";
import useAuthentication from "./useAuthentication";

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
        let newAccessToken: string = "";

        await graphQLRequest<{ refresh: TAuthentication }>(
            `{
                refresh {
                    name
                    email
                    permissions
                    purchases
                    accessToken
                }
            }`,
            (data) => {
                newAccessToken = data.refresh.accessToken;
                setAuthentication(data.refresh);
            }
        );

        return newAccessToken;
    };
    return refresh;
};

export default useRefreshToken;

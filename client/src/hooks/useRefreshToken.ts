import { graphQLRequest } from "../api/server";
import { TAuthentication } from "../context/AuthProvider";
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
                    permissions
                    accessToken
                }
            }`,
            (data) => {
                const { name, permissions, accessToken } = data.refresh;
                newAccessToken = accessToken;
                setAuthentication(
                    (previous) =>
                        ({
                            ...previous,
                            name,
                            permissions,
                            accessToken,
                        } as TAuthentication)
                );
            }
        );

        return newAccessToken;
    };
    return refresh;
};

export default useRefreshToken;

import axios from "../api/axios";
import { TAuthentication } from "../context/AuthProvider";
import useAuthentication from "./useAuthentication";

const useRefreshToken = () => {
    const { setAuthentication } = useAuthentication();

    const refresh = async (): Promise<string> => {
        const response = await axios.get("/refresh", {
            withCredentials: true,
        });
        const accessToken = response.data.accessToken;
        setAuthentication((prev) => {
            console.log("access token refreshed");
            return {
                ...prev,
                name: response.data.name,
                permissions: response.data.permissions,
                accessToken: accessToken
            } as TAuthentication;
        });
        return accessToken;
    }
    return refresh;
};

export default useRefreshToken;
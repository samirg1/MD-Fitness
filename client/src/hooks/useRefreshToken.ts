import axios from "../api/axios";
import { TAuthentication } from "../context/AuthProvider";
import useAuthentication from "./useAuthentication";

const useRefreshToken = () => {
    const { setAuthentication } = useAuthentication();

    const refresh = async (): Promise<string> => {
        const response = await axios.get("/refresh", {
            withCredentials: true,
        });
        console.log(response.data)
        const accessToken = response.data.accessToken;
        setAuthentication((prev) => {
            console.log(JSON.stringify(prev));
            console.log(accessToken)
            return { ...prev, accessToken: accessToken } as TAuthentication;
        });
        return accessToken;
    }
    return refresh;
};

export default useRefreshToken;
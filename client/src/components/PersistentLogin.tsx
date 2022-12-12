import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import useRefreshToken from "../hooks/useRefreshToken";
import Loader from "./Loader";

const PersistentLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { authentication } = useAuthentication();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error: any) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        !authentication?.accessToken
            ? verifyRefreshToken()
            : setIsLoading(false);
    }, [refresh, authentication]);

    return (
        <>
            <Loader isLoading={isLoading} />
            {isLoading ? null : <Outlet />}
        </>
    );
};

export default PersistentLogin;

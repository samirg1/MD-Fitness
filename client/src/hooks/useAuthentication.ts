import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

/**
 * Hook to provide the authentication context.
 * @returns The authentication context.
 */
const useAuthentication = () => {
    return useContext(AuthContext);
};

export default useAuthentication;

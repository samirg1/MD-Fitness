import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import useSnackBar from "../hooks/useSnackBar";

const RequireAuthentication = ({ permissions }: { permissions: number[] }) => {
    const { authentication } = useAuthentication();
    const location = useLocation();
    const { setOptions: setSnackBarOptions } = useSnackBar();

    const checkPermissions = (): boolean => {
        if (!authentication) return false;
        return Boolean(
            authentication.permissions.find((permission) =>
                permissions.includes(permission)
            )
        );
    };

    useEffect(() => {
        if (!authentication) {
            setSnackBarOptions({
                message: "You must be logged in to view this page.",
                type: "info",
            });
        }
    }, [authentication, setSnackBarOptions]);

    return authentication ? (
        checkPermissions() ? (
            <Outlet />
        ) : (
            <Navigate to="/unauthorised" state={{ from: location }} replace />
        )
    ) : (
        <Navigate to="/login-signup" state={{ from: location }} replace />
    );
};

export default RequireAuthentication;

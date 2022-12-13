import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import useSnackBar from "../hooks/useSnackBar";

/**
 * Parent component that manages the authentication state to only allow access to its children if user is logged in and has the required permissions.
 * @param permissions List of permissions that can access the children of this component.
 */
const RequireAuthentication = ({ permissions }: { permissions: number[] }) => {
    const { authentication } = useAuthentication();
    const location = useLocation();
    const { setOptions: setSnackBarOptions } = useSnackBar();

    /**
     * Check the permissions against the user's to determine if the user is allowed to view the children of this component.
     * @returns If the user can view the children of this component.
     */
    const checkPermissions = (): boolean => {
        if (!authentication) return false;
        return Boolean(
            authentication.permissions.find((permission) =>
                permissions.includes(permission)
            )
        );
    };

    useEffect(() => {
        // kick out the user
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

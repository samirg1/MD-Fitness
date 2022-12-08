import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import useSnackBar from "../hooks/useSnackBar";

const RequireAuthentication = ({
    allowedPermissions,
}: {
    allowedPermissions: number[];
}) => {
    const { authentication } = useAuthentication();
    const location = useLocation();
    const { setOptions: setSnackBarOptions } = useSnackBar();

    const provideUserMessage = () => {
        setSnackBarOptions({
            message: "You must be logged in to view this page.",
            type: "info",
        });
    };

    if (authentication) {
        if (
            authentication.permissions.find((permission) =>
                allowedPermissions.includes(permission)
            )
        ) {
            return <Outlet />;
        }
        return (
            <Navigate to="/unauthorised" state={{ from: location }} replace />
        );
    } else {
        provideUserMessage();
        return (
            <Navigate to="/login-signup" state={{ from: location }} replace />
        );
    }
};

export default RequireAuthentication;

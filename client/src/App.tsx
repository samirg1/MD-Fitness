import "@stripe/stripe-js";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./config/Layout";
import PERMISSIONS from "./config/permissions";

const Home = lazy(() => import("./components/homepage/Home"));
const Programs = lazy(() => import("./components/programs/Programs"));
const Missing = lazy(() => import("./components/defaults/Missing"));
const Unauthorised = lazy(() => import("./components/defaults/Unauthorised"));
const Admin = lazy(() => import("./components/admin/Admin"));
const Account = lazy(() => import("./components/account/Account"));
const ConfirmEmail = lazy(() => import("./components/defaults/ConfirmEmail"));
const LoginSignup = lazy(() => import("./components/login-signup/LoginSignup"));
const PersistentLogin = lazy(() => import("./components/PersistentLogin"));
const RequireAuthentication = lazy(
    () => import("./components/RequireAuthentication")
);

/**
 * Master component for the application.
 */
const App = () => {
    return (
        <Routes>
            <Route element={<PersistentLogin />}>
                <Route path="/" element={<Layout />}>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="programs" element={<Programs />} />
                    <Route path="login-signup" element={<LoginSignup />} />

                    {/* Protected routes */}
                    <Route
                        element={
                            <RequireAuthentication
                                permissions={[PERMISSIONS.user]}
                            />
                        }
                    >
                        <Route path="account" element={<Account />} />
                    </Route>
                    <Route
                        element={
                            <RequireAuthentication
                                permissions={[PERMISSIONS.admin]}
                            />
                        }
                    >
                        <Route path="admin" element={<Admin />} />
                    </Route>

                    {/* Default routes */}
                    <Route
                        path="confirm-email/:token"
                        element={<ConfirmEmail />}
                    />
                    <Route path="unauthorised" element={<Unauthorised />} />
                    <Route path="*" element={<Missing />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;

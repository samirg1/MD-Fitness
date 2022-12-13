import "@stripe/stripe-js";
import { Route, Routes } from "react-router-dom";
import Account from "./components/account/Account";
import Admin from "./components/admin/Admin";
import ConfirmEmail from "./components/defaults/ConfirmEmail";
import Missing from "./components/defaults/Missing";
import Unauthorised from "./components/defaults/Unauthorised";
import Home from "./components/homepage/Home";
import LoginSignup from "./components/login-signup/LoginSignup";
import PersistentLogin from "./components/PersistentLogin";
import Programs from "./components/programs/Programs";
import RequireAuthentication from "./components/RequireAuthentication";
import Layout from "./config/Layout";
import PERMISSIONS from "./config/permissionsList";

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
                        path="confirm-email/:userID"
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

import "@stripe/stripe-js";
import { Route, Routes } from "react-router-dom";
import Account from "./components/account/Account";
import Admin from "./components/admin/Admin";
import Missing from "./components/defaultPages/Missing";
import Unauthorised from "./components/defaultPages/Unauthorised";
import Home from "./components/homepage/Home";
import LoginSignup from "./components/login-signup/LoginSignup";
import PersistentLogin from "./components/PersistentLogin";
import Programs from "./components/programs/Programs";
import RequireAuthentication from "./components/RequireAuthentication";
import Layout from "./config/Layout";
import PERMISSIONS from "./config/permissionsList";

const App = () => {
    return (
        <Routes>
            <Route element={<PersistentLogin />}>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="programs" element={<Programs />} />
                    <Route path="login-signup" element={<LoginSignup />} />

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

                    <Route path="unauthorised" element={<Unauthorised />} />
                    <Route path="*" element={<Missing />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;

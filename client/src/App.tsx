import "@stripe/stripe-js";
import { Route, Routes } from "react-router-dom";
import Home from "./components/homepage/Home";
import LoginSignup from "./components/login-signup/LoginSignup";
import Missing from "./components/miscellaneous/Missing";
import Programs from "./components/programs/Programs";
import Unauthorised from "./components/miscellaneous/Unauthorised";
import Layout from "./config/Layout";
import Admin from "./components/admin/Admin";
import Account from "./components/account/Account";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="programs" element={<Programs />} />
                <Route path="login-signup" element={<LoginSignup />} />

                <Route path="account" element={<Account />} />
                <Route path="admin" element={<Admin />} />

                <Route path="unauthorised" element={<Unauthorised />} />
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
};

export default App;

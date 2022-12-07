import { ThemeProvider } from "@mui/system";
import "@stripe/stripe-js";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StripeHook from "./api/stripe";
import ResponsiveAppBar from "./components/app-bar/AppBar";
import Home from "./components/homepage/Home";
import LoadingIcon from "./components/Loader";
import LoginSignup from "./components/login-signup/LoginSignup";
import SnackBar from "./components/SnackBar";
import theme from "./theme";

const pages = ["Programs"];

const App = () => {
    const { isLoading, redirectToCheckout } = StripeHook();
    const [snackbarMessage, setSnackBarMessage] = useState("");

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <ResponsiveAppBar pages={pages} />
                <SnackBar message={snackbarMessage} setMessage={setSnackBarMessage} />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/programs"
                        element={
                            <>
                                <LoadingIcon isLoading={isLoading} />
                                <div>
                                    <button
                                        onClick={redirectToCheckout}
                                        disabled={isLoading}
                                        style={{
                                            width: "20%",
                                            height: "20%",
                                            fontSize: "20px",
                                        }}
                                    >
                                        {isLoading ? "Loading..." : "Buy"}
                                    </button>
                                </div>
                            </>
                        }
                    />
                    <Route path="/login-signup" element={<LoginSignup setSnackbarMessage={setSnackBarMessage} />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

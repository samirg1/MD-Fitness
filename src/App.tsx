import { ThemeProvider } from "@mui/system";
import "@stripe/stripe-js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./app-bar/AppBar";
import Home from "./homepage/Home";
import LoadingIcon from "./Loader";
import StripeHook from "./stripe";
import theme from "./theme";

const pages = ["Programs"];

const App = () => {
    const { isLoading, redirectToCheckout } = StripeHook();

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <ResponsiveAppBar pages={pages} />
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
                                    >
                                        {isLoading ? "Loading..." : "Buy"}
                                    </button>
                                </div>
                            </>
                        }
                    ></Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;

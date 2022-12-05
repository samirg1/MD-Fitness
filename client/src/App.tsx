import { ThemeProvider } from "@mui/system";
import "@stripe/stripe-js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./app-bar/AppBar";
import Home from "./homepage/Home";
import LoadingIcon from "./Loader";
import StripeHook from "./stripe";
import TestComp from "./testComponent";
import theme from "./theme";

const pages = ["Programs"];

const App = () => {
    const { isLoading, redirectToCheckout } = StripeHook();

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
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
                                        style={{
                                            width: "20%",
                                            height: "20%",
                                            fontSize: "20px",
                                        }}
                                    >
                                        {isLoading ? "Loading..." : "Buy"}
                                    </button>
                                </div>
                                <TestComp/>
                            </>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

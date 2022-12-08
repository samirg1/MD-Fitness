import { ThemeProvider } from "@mui/system";
import "@stripe/stripe-js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/app-bar/AppBar";
import Home from "./components/homepage/Home";
import LoginSignup from "./components/login-signup/LoginSignup";
import Programs from "./components/programs/Programs";
import SnackBar from "./components/SnackBar";
import { SnackBarProvider } from "./context/SnackBarProvider";
import theme from "./theme";

const pages = ["Programs"];

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <SnackBarProvider>
                <BrowserRouter>
                    <ResponsiveAppBar pages={pages} />
                    <SnackBar />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/programs" element={<Programs />} />
                        <Route path="/login-signup" element={<LoginSignup />} />
                    </Routes>
                </BrowserRouter>
            </SnackBarProvider>
        </ThemeProvider>
    );
};

export default App;

import { ThemeProvider } from "@mui/system";
import "@stripe/stripe-js";
import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./app-bar/AppBar";
import Home from "./homepage/Home";
import { StripeComponent } from "./stripe";
import theme from "./theme";

const pages = ["Programs"];

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <ResponsiveAppBar pages={pages} />
                    <Routes>
                        <Route exact path="/" element={<Home />}></Route>
                        <Route
                            path="/programs"
                            element={<StripeComponent />}
                        ></Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;

import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/system";
import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./AppBar";
import Home from "./Home";
import theme from "./theme";

const pages = ["Programs"];

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <ResponsiveAppBar pages={pages} />
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Home />}
                        ></Route>
                        <Route
                            path="/programs"
                            element={<Typography>Programs</Typography>}
                        ></Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;

import Typography from "@mui/material/Typography";
import { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./AppBar";

const pages = ["Programs"];

class App extends Component {
    render() {
        return (
            <Fragment>
                <Router>
                    <ResponsiveAppBar pages={pages} />
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Typography>Home</Typography>}
                        ></Route>
                        <Route
                            path="/programs"
                            element={<Typography>Programs</Typography>}
                        ></Route>
                    </Routes>
                </Router>
            </Fragment>
        );
    }
}

export default App;

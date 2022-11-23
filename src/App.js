import Typography from "@mui/material/Typography";
import { Component, Fragment } from "react";
import ResponsiveAppBar from "./AppBar";

const pages = ["Home", "Programs"];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: pages[0], // initialise as the first page (dashboard)
        };
    }

    /**
     * Changes the current page display.
     * @param {string} newPage the new page to display.
     */
    changePage(newPage) {
        this.setState({ page: newPage });
    }

    /**
     * Get the page content for the current page.
     * @return {JSX.Element} the page content for the current page.
     */
    getPageContent() {
        return <Typography>{this.state.page}</Typography>;
    }

    render() {
        return (
            <Fragment>
                <ResponsiveAppBar
                    pages={pages}
                    changePage={(page) => this.changePage(page)}
                />
                {this.getPageContent()}
            </Fragment>
        );
    }
}

export default App;

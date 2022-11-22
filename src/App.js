import { Component, Fragment } from "react";
import ResponsiveAppBar from "./AppBar";
import Typography from "@mui/material/Typography";

const pages = ["Dashboard", "Planner", "Progress"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: pages[0],
    };
  }

  changePage(newPage) {
    this.setState({ page: newPage });
  }

  render() {
    return (
      <Fragment>
        <ResponsiveAppBar pages={pages} changePage={(page) => this.changePage(page)} />
        <Typography>{ this.state.page }</Typography>
      </Fragment>
    );
  }
}

export default App;

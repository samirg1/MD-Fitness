import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Component, Fragment } from "react";
import AppIcon from '../img/icon.jpg';

export default class AppBarIconText extends Component {
    render() {
        return (
            <Fragment>
                <Avatar
                    alt="MDFit"
                    src={AppIcon}
                    sx={{ display: { xs: this.props.large ? "none" : "flex", md: this.props.large ? "flex" : "none" }, mr: 1 }}
                />
                <Typography
                    variant={this.props.large ? "h6" : "h5"}
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: this.props.large ? "none" : "flex", md: this.props.large ? "flex" : "none" },
                        fontFamily: "arial",
                        fontWeight: 700,
                        color: "inherit",
                        textDecoration: "none",
                        flexGrow: Number(Boolean(!this.props.large))
                    }}
                >
                    {this.props.name}
                </Typography>
            </Fragment>
        );
    }
}

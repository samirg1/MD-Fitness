import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import { Component } from "react";

export default class HomeTitle extends Component {
    render() {
        return (
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography
                    variant="h4"
                    color="primary"
                    style={{
                        fontWeight: "bold",
                    }}
                >
                    {this.props.title}
                </Typography>
            </Grid>
        );
    }
}

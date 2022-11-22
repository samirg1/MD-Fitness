import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Component } from 'react';

class Planner extends Component {
    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant='h3'>Planner</Typography>
                </Grid>
            </Grid>
        );
    }
}

export default Planner;
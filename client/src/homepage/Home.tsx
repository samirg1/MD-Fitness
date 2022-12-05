import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import About from "./About";
import ProgramsSummary from "./ProgramsSummary";

const Home = () => {
    return (
        <Box
            style={{
                position: "absolute",
                top: "15%",
                left: "10%",
                right: "10%",
            }}
        >
            <Grid container spacing={3}>
                <About />
                <ProgramsSummary />
            </Grid>
        </Box>
    );
};

export default Home;

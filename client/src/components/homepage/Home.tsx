import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card";
import PageTitle from "../PageTitle";
import BetaPopup from "./BetaPopup";

/**
 * The main interface for the Home page.
 */
const Home = () => {
    const navigate = useNavigate();

    const [betaPopupOpen, setBetaPopupOpen] = useState(true);

    return (
        <>
            <BetaPopup
                open={betaPopupOpen}
                handleClose={() => setBetaPopupOpen(false)}
            />
            <Box
                style={{
                    position: "absolute",
                    top: "15%",
                    left: "10%",
                    right: "10%",
                }}
            >
                <PageTitle>
                    <>
                        Welcome to <br /> MD-Fitness
                    </>
                </PageTitle>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Card
                            onClick={() => navigate("/about")}
                            title="ABOUT"
                            navTitle="Learn more"
                        >
                            Jeff Cavaliere MSPT, CSCS served as both the Head
                            Physical Therapist and Assistant Strength Coach for
                            the New York Mets during the National League...
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card
                            onClick={() => navigate("/programs")}
                            title="PROGRAMS"
                        >
                            View current programs here
                        </Card>
                    </Grid>
                </Grid>
                <Grid>
                    <br />
                    <br />
                </Grid>
                <a
                    style={{ color: "white" }}
                    href="mailto:mdfitness3152@gmail.com?cc=srgupta@bigpond.com&subject=Feedback%20for%20MD-Fitness%20webpage&body=Type%20of%20Feedback%3A%0D%0A%5Berror%20%2F%20bug%2C%20suggestion%2C%20general%2C%20etc%5D%0D%0A%0D%0ADescription%20of%20feedback%3A%20%0D%0A%5Benter%20text%20here%5D%0D%0A%0D%0APotential%20solution%20(if%20applicable)%20%3A%20%0D%0A%5Benter%20text%20here%5D"
                >
                    Give feedback here
                </a>
            </Box>
        </>
    );
};

export default Home;

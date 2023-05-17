import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card";
import PageTitle from "../PageTitle";
import BetaPopup from "./BetaPopup";

let betaPoppedUp = false;

/**
 * The main interface for the Home page.
 */
const Home = () => {
    const navigate = useNavigate();

    const [betaPopupOpen, setBetaPopupOpen] = useState(!betaPoppedUp);

    return (
        <>
            <BetaPopup
                open={betaPopupOpen}
                handleClose={() => {
                    setBetaPopupOpen(false);
                    betaPoppedUp = true;
                }}
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
                <button onClick={() => setBetaPopupOpen(true)}>
                    Show Beta Popup
                </button>
            </Box>
        </>
    );
};

export default Home;

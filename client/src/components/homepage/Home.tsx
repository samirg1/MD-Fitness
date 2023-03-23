import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import PurchaseConfirmation from "../../emails/PurchaseConfirmation";
import useAccount from "../../hooks/useAccount";
import Card from "../Card";
import PageTitle from "../PageTitle";

/**
 * The main interface for the Home page.
 */
const Home = () => {
    const navigate = useNavigate();

    const { sendConfirmationEmail } = useAccount();

    return (
        <Box
            style={{
                position: "absolute",
                top: "15%",
                left: "10%",
                right: "10%",
            }}
        >
            <PurchaseConfirmation />
            <button onClick={() => sendConfirmationEmail("srgupta@bigpond.com")}>send</button>
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
                        Physical Therapist and Assistant Strength Coach for the
                        New York Mets during the National League...
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
        </Box>
    );
};

export default Home;

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageTitle from "../PageTitle";
const ABOUT_IMAGE = require("../../img/aboutImage.jpeg");
const BEFORE_IMAGE = require("../../img/before.jpeg");
const AFTER_IMAGE = require("../../img/after.jpeg");

/** The About Page base */
const About = () => {
    return (
        <Box
            style={{
                position: "absolute",
                top: "15%",
                left: "10%",
                right: "10%",
            }}
        >
            <PageTitle size="small">About</PageTitle>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography color="white">
                        Jeff Cavaliere MSPT, CSCS served as both the Head
                        Physical Therapist and Assistant Strength Coach for the
                        New York Mets during the National League East
                        Championship 2006, 2007 and 2008 seasons and coached
                        some of the game's most accomplished players including
                        future hall of fame pitchers Tom Glavine and Pedro
                        Martinez, and perennial all-stars Carlos Delgado, Carlos
                        Beltran, David Wright, Jose Reyes, and Billy Wagner to
                        name just a few. He is a Certified Strength and
                        Conditioning Specialist by the National Strength and
                        Conditioning Association (NSCA).
                    </Typography>
                    <br />
                    <Typography color="white">
                        Jeff received his Masters Degree in Physical Therapy and
                        Bachelor of Science in Physioneurobiology / Premedicine
                        from the University of Connecticut in Storrs, CT (one of
                        the top 5 universities in the country in physical
                        therapy and sports medicine). Off the field, Cavaliere
                        is a much sought after author and lecturer, speaking on
                        the topics of baseball injury prevention and sport
                        specific conditioning and has appeared numerous times in
                        print media writing (including many of the top Fitness
                        Magazines) on the topics of sports training, injury
                        rehabilitation and prevention. Consistent with his
                        desire to leave no stone unturned in the pursuit of
                        creating the “complete and functional athlete”,
                        Cavaliere also possesses an extensive knowledge of
                        nutrition that he has simplified for the masses and both
                        practices and preaches with outstanding results.
                    </Typography>
                </Grid>
                <br />
                <Grid item xs={6} style={{ textAlign: "center" }}>
                    <img src={ABOUT_IMAGE} alt="Matt Donald" />
                </Grid>
                <Grid item xs={6} style={{ textAlign: "center" }}>
                    <img src={BEFORE_IMAGE} alt="Before" />
                </Grid>
                <Grid item xs={6} style={{ textAlign: "center" }}>
                    <img src={AFTER_IMAGE} alt="After" />
                </Grid>
            </Grid>
            <Grid>
                <br />
                <br />
            </Grid>
        </Box>
    );
};

export default About;

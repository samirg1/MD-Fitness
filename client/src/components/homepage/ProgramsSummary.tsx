import { CardActions, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import HomeTitle from "./HomeTitle";

const program_description = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ultrices neque ornare aenean. Nullam non nisi est sit. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Eget gravida cum sociis natoque penatibus. In metus vulputate eu scelerisque felis imperdiet. Urna id volutpat lacus laoreet non curabitur. Auctor urna nunc id cursus metus aliquam eleifend. Malesuada fames ac turpis egestas integer. Hendrerit gravida rutrum quisque non.
`;

/**
 * The programs summary component of the home page.
 */
const ProgramsSummary = () => {
    const navigate = useNavigate();

    return (
        <>
            <HomeTitle title={"PROGRAMS"} />
            <Card variant="outlined">
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography>{program_description}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => navigate("/programs")}
                        variant="contained"
                    >
                        View Programs
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default ProgramsSummary;

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

/**
 * Component for a title for the home page.
 * @param title The title to display.
 */
const HomeTitle = ({ title }: { title: string }) => {
    return (
        <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography
                variant="h4"
                color="primary"
                style={{
                    fontWeight: "bold",
                }}
            >
                {title}
            </Typography>
        </Grid>
    );
};

export default HomeTitle;

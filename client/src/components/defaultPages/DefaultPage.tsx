import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

type TDefaultPageProps = {
    displayText: string;
    back?: boolean;
};

/**
 * Default page for miscellaneous pages.
 * @param displayText The text to display on this page.
 * @param back Whether to have the back button on the page.
 */
const DefaultPage = ({ displayText, back }: TDefaultPageProps) => {
    const navigate = useNavigate();

    /**
     * Go back to the previous page.
     */
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div
            style={{
                verticalAlign: "middle",
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
                width: "150px",
                aspectRatio: "1",
                background: "rgb(41, 72, 157)",
                color: "white",
                textAlign: "center",
                borderRadius: "25%",
                display: "grid",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <span>{displayText}</span>
                </Grid>
                {back ? (
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={goBack}
                            color="secondary"
                        >
                            Back
                        </Button>
                    </Grid>
                ) : null}
            </Grid>
        </div>
    );
};

export default DefaultPage;

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";

type TResetPasswordFieldProps = {
    fieldTitle: string;
    value: string;
    loading: boolean;
    setValue: (value: string) => void;
    type?: string;
    showButton?: boolean;
    onClick?: () => void;
};

const ResetPasswordField = ({
    fieldTitle,
    value,
    loading,
    setValue,
    type = "text",
    showButton = false,
    onClick = () => {},
}: TResetPasswordFieldProps) => {
    return (
        <>
            <Grid item xs={12}>
                <Typography>{fieldTitle}</Typography>
            </Grid>
            <Grid item xs={10} style={{ textAlign: "center" }}>
                <OutlinedInput
                    sx={{ width: "100%" }}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    type={type}
                />
            </Grid>
            {showButton && (
                <Grid item xs={2} style={{ textAlign: "center" }}>
                    {loading ? (
                        <CircularProgress size={30} color="inherit" />
                    ) : (
                        <IconButton
                            color="primary"
                            sx={{ paddingTop: "15px" }}
                            onClick={() => onClick()}
                        >
                            <ArrowCircleRightIcon />
                        </IconButton>
                    )}
                </Grid>
            )}
        </>
    );
};

export default ResetPasswordField;

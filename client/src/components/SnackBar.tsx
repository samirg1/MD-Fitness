import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useSnackBar from "../hooks/useSnackBar";

/**
 * SnackBar component to display a message to the user.
 */
const SnackBar = () => {
    const { options, setOptions } = useSnackBar();
    return (
        <Snackbar
            open={options !== null}
            autoHideDuration={options?.duration || 3000}
            onClose={() => setOptions(null)}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <Alert severity={options?.type} sx={{ width: "100%" }}>
                {options?.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;

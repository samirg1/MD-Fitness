import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useContext } from "react";
import SnackBarContext from "../context/SnackBarProvider";

const SnackBar = () => {
    const { message, setMessage } = useContext(SnackBarContext);

    return (
        <>
            <Snackbar
                open={message !== null}
                autoHideDuration={3000}
                onClose={() => setMessage(null)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SnackBar;

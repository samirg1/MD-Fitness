import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type TSnackBar = {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const SnackBar = ({ message, setMessage }: TSnackBar) => {
    return (
        <>
            <Snackbar
                open={Boolean(message)}
                autoHideDuration={3000}
                onClose={() => setMessage("")}
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

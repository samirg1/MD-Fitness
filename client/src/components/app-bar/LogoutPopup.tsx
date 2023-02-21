import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useAccount from "../../hooks/useAccount";
import useKeyDownHandler from "../../hooks/useKeyDownHandler";
import useSnackBar from "../../hooks/useSnackBar";

const popupStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

type TLogoutPopupProps = {
    open: boolean;
    handleClose: () => void;
};

/**
 * Component for the popup dialog that displays when the user wants to logout.
 * @param open Whether or not this popup is open.
 * @param handleClose Function that handles the closure of the popup.
 */
const LogoutPopup = ({ open, handleClose }: TLogoutPopupProps) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { logout } = useAccount();
    const { setOptions: setSnackBarMessage } = useSnackBar();
    const keyDownHandler = useKeyDownHandler();

    /**
     * Handle the logout of the user when selected.
     */
    const handleLogout = async () => {
        setIsLoggingOut(true);
        const response = await logout();
        setIsLoggingOut(false);
        if (response) {
            setSnackBarMessage({
                message: response,
                type: "error",
            });
        }
        handleClose();
    };

    // Keyboard shortcut for logging out.
    useEffect(() => keyDownHandler("Enter", handleLogout));

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={popupStyle}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Logout?
                            </Typography>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: "center" }}>
                            <Button
                                variant="contained"
                                sx={{ mt: 2 }}
                                onClick={handleClose}
                                disabled={isLoggingOut}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: "center" }}>
                            <Button
                                disabled={isLoggingOut}
                                variant="contained"
                                sx={{ mt: 2 }}
                                color="error"
                                onClick={handleLogout}
                            >
                                Logout{" "}
                                {isLoggingOut ? (
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                    />
                                ) : null}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default LogoutPopup;

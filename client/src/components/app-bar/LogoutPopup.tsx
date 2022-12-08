import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import useAccount from "../../hooks/useAccount";
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

const LogoutPopup = ({ open, handleClose }: TLogoutPopupProps) => {
    const { logout } = useAccount();
    const { setOptions: setSnackBarMessage } = useSnackBar();

    const handleLogout = () => {
        logout();
        setSnackBarMessage({
            message: "Logout successful",
            type: "success"
        });
        handleClose();
    };

    return (
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
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "center" }}>
                        <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            color="error"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default LogoutPopup;

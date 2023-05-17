import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";

type TResetPasswordModalProps = {
    open: boolean;
    handleClose: () => void;
};

const popupStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const BetaPopup = ({ open, handleClose }: TResetPasswordModalProps) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={popupStyle}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Welcome to the Beta!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ fontSize: "small" }}>
                            Current version: 1.0.1
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Please explore the website and relay any feedback{" "}
                            <a href="mailto:mdfitness3152@gmail.com?cc=srgupta@bigpond.com&subject=Feedback%20for%20MD-Fitness%20webpage&body=Type%20of%20Feedback%3A%0D%0A%5Berror%20%2F%20bug%2C%20suggestion%2C%20general%2C%20etc%5D%0D%0A%0D%0ADescription%20of%20feedback%3A%20%0D%0A%5Benter%20text%20here%5D%0D%0A%0D%0APotential%20solution%20(if%20applicable)%20%3A%20%0D%0A%5Benter%20text%20here%5D">
                                here
                            </a>{" "}
                            to help out!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Please note that all design, functionality and
                            payments are in test mode and are not final.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            For test payments
                        </Typography>
                        <Typography>
                            Card Number: 4242 4242 4242 4242
                        </Typography>
                        <Typography>Expiry Date: [any future date]</Typography>
                        <Typography>CVC: [any three numbers]</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default BetaPopup;

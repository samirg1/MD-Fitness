import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import ResetPasswordField from "./ResetPasswordField";

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

const ResetPasswordModal = ({
    open,
    handleClose,
}: TResetPasswordModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");

    const [viewingCode, setViewingCode] = useState(false);
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const requestResetPasswordCode = (email: string) => {
        setIsLoading(true);
        console.log(email);
        setViewingCode(true);
        setIsLoading(false);
    };

    const resetPassword = (code: string, newPassword: string) => {
        setIsLoading(true);
        console.log(code, newPassword);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => {
                    setEmail("");
                    setCode("");
                    setNewPassword("");
                    setViewingCode(false);
                    handleClose();
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={popupStyle}>
                    <Grid container spacing={1}>
                        {!viewingCode ? (
                            <ResetPasswordField
                                fieldTitle="Enter your email to reset your password"
                                value={email}
                                setValue={(newEmail) => setEmail(newEmail)}
                                loading={isLoading}
                                showButton
                                onClick={() => requestResetPasswordCode(email)}
                            />
                        ) : (
                            <>
                                <ResetPasswordField
                                    fieldTitle="Enter the code sent to your email"
                                    value={code}
                                    setValue={(newCode) => setCode(newCode)}
                                    loading={isLoading}
                                />
                                <ResetPasswordField
                                    fieldTitle="Enter your new password"
                                    value={newPassword}
                                    setValue={(newPassword) =>
                                        setNewPassword(newPassword)
                                    }
                                    loading={isLoading}
                                    showButton
                                    onClick={() =>
                                        resetPassword(code, newPassword)
                                    }
                                />
                            </>
                        )}
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default ResetPasswordModal;

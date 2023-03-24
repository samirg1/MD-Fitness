import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import useResetPassword from "../../hooks/useResetPassword";
import useSnackBar from "../../hooks/useSnackBar";
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

    const { requestResetCode, resetPassword } = useResetPassword();
    const { setOptions: setSnackBarOptions } = useSnackBar();

    const handleRequestCode = async (email: string) => {
        setIsLoading(true);
        const response = await requestResetCode(email);
        if (response === null) {
            setIsLoading(false);
            setViewingCode(true);
            return;
        }

        alert(response);
        setIsLoading(false);
    };

    const handleReset = async (
        email: string,
        code: string,
        newPassword: string
    ) => {
        setIsLoading(true);
        const response = await resetPassword(email, code, newPassword);
        if (response === null) {
            setIsLoading(false);
            setSnackBarOptions({
                message: "Password reset successfully",
                type: "success",
            });
            handleClose();
            return;
        }
        
        alert(response);
        setIsLoading(false);
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
                                onClick={() => handleRequestCode(email)}
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
                                        handleReset(email, code, newPassword)
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

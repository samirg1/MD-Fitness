import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import useAccount from "../../hooks/useAccount";
import useSnackBar from "../../hooks/useSnackBar";

const INTERVAL_LENGTH = 120;

/**
 * Account verification component to show when user's email is being verified.
 * @param email The email that is being verified.
 */
const AccountVerification = ({ email }: { email: string }) => {
    const [timeLeft, setTimeLeft] = useState(INTERVAL_LENGTH);
    const [intervalActive, setIntervalActive] = useState(false);

    const { sendConfirmationEmail } = useAccount();
    const { setOptions: setSnackBarOptions } = useSnackBar();

    // interval to count down when the user can resend confirmation
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((previous) => {
                if (previous !== 0) return previous - 1;
                clearInterval(interval);
                return 0;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [intervalActive]);

    /**
     * Resend the confirmation email.
     */
    const resend = async () => {
        const response = await sendConfirmationEmail(email);
        if (response) {
            // if error
            return setSnackBarOptions({
                message: "Unable to resend email : " + response,
                type: "error",
            });
        }

        setSnackBarOptions({
            message: "Confirmation email resent!",
            type: "success",
        });

        setTimeLeft(INTERVAL_LENGTH);
        setIntervalActive(true);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ textAlign: "center", color: "white" }}>
                {`A confirmation link has been sent to '${email}' to verify your account.`}
                {timeLeft !== 0 ? ` Resend in ${timeLeft} seconds.` : ""}
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                    variant="contained"
                    disabled={timeLeft !== 0}
                    onClick={resend}
                    color="secondary"
                >
                    Resend
                </Button>
            </Grid>
        </Grid>
    );
};

export default AccountVerification;

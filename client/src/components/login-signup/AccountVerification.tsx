import Grid from "@mui/material/Grid";

/**
 * Account verification component to show when user's email is being verified.
 * @param email The email that is being verified. 
 */
const AccountVerification = ({ email }: { email: string }) => {
    return (
        <Grid item xs={12} sx={{ textAlign: "center" }}>
            {`A confirmation link has been sent to '${email}' to verify your account.`}
        </Grid>
    );
};

export default AccountVerification;

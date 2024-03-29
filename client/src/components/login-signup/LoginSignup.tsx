import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import useKeyDownHandler from "../../hooks/useKeyDownHandler";
import useSnackBar from "../../hooks/useSnackBar";
import Loader from "../Loader";
import AccountVerification from "./AccountVerification";
import Field from "./Field";
import "./ResetPasswordButton.css";
import ResetPasswordModal from "./ResetPasswordModal";

/**
 * Login and signup page.
 */
const LoginSignup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [loginSignupError, setLoginSignupError] = useState<string | null>(
        null
    );
    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { signup, login } = useAccount();
    const keyDownHandler = useKeyDownHandler();
    const { setOptions: setSnackBarOptions } = useSnackBar();
    const from = location.state?.from?.pathname || "/"; // get from location if there is one

    const emailInputRef = useRef<HTMLInputElement>();
    const nameInputRef = useRef<HTMLInputElement>();
    useEffect(() => {
        loggingIn
            ? emailInputRef.current?.focus()
            : nameInputRef.current?.focus();
    }, [loggingIn]);

    // clear error when fields change
    useEffect(() => setLoginSignupError(null), [name, email, password]);

    /**
     * Reset the values of the fields.
     */
    const resetFields = () => {
        setName("");
        setEmail("");
        setPassword("");
    };

    /**
     * Toggle between logging in and signing up.
     */
    const toggleLoggingIn = () => {
        setLoggingIn((previous) => !previous);
        resetFields();
    };

    /**
     * Submit the login / signup.
     */
    const submit = async () => {
        setLoading(true);

        // call auth functions
        if (loggingIn) await performLogin();
        else await performSignup();
    };

    /**
     * Perform the login.
     */
    const performLogin = async () => {
        const responseError = await login({
            email: email,
            password: password,
        });
        setLoginSignupError(responseError);

        setLoading(false);
        if (!responseError) {
            resetFields();
            navigate(from, { replace: true }); // go back to where user was (if applicable)
            setSnackBarOptions({
                message: "Successfully logged in",
                type: "success",
            });
        }
    };

    /**
     * Perform a user signup.
     */
    const performSignup = async () => {
        const responseError = await signup({
            name: name,
            email: email,
            password: password,
        });
        // override default password error message
        if (responseError?.startsWith('"password" with value'))
            setLoginSignupError(
                "invalid password - must be 8 characters long with an uppercase letter, lowercase letter, number and special character"
            );
        else setLoginSignupError(responseError);

        setLoading(false);
        if (!responseError) {
            localStorage.setItem("verification", JSON.stringify(true));
            setVerifying(true);
            setSnackBarOptions({
                message:
                    "Successfully signed up - please check email for account activation",
                type: "success",
                duration: 10000,
            });
        }
    };

    /**
     * Toggle the verification state of the page.
     * @param newValue The new verifying value.
     */
    const toggleVerifying = (newValue: boolean) => {
        setVerifying(newValue);
        if (!newValue) {
            setLoggingIn(true);
            performLogin();
        }
    };

    /**
     * Toggles the verification status of the page with a local storage change event.
     * @param event Local storage change event.
     */
    const onStorageUpdate = (event: any) => {
        const { key, newValue } = event;
        if (key === "verification") {
            toggleVerifying(JSON.parse(newValue));
        }
    };

    const onEnter = () => {
        if (!resetPasswordModalOpen) submit();
    };

    // when user presses enter the form submits
    useEffect(() => keyDownHandler("Enter", onEnter));

    // listen for local storage changes
    useEffect(() => {
        window.addEventListener("storage", onStorageUpdate);
        return () => window.removeEventListener("storage", onStorageUpdate);
    });

    return (
        <>
            <Loader isLoading={loading} />
            <Box
                style={{
                    position: "absolute",
                    top: "15%",
                    left: "10%",
                    right: "10%",
                }}
            >
                <ResetPasswordModal
                    open={resetPasswordModalOpen}
                    handleClose={() => setResetPasswordModalOpen(false)}
                    startEmail={email}
                />
                <Grid container spacing={3}>
                    {verifying ? (
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <AccountVerification email={email} />
                        </Grid>
                    ) : null}
                    <Grid item xs={12}>
                        <ToggleButtonGroup
                            color="primary"
                            sx={{ backgroundColor: "white" }}
                            value={loggingIn ? "login" : "signup"}
                            exclusive
                            onChange={toggleLoggingIn}
                            disabled={loading || verifying}
                        >
                            <ToggleButton value="login" disabled={loggingIn}>
                                Login
                            </ToggleButton>
                            <ToggleButton value="signup" disabled={!loggingIn}>
                                Sign Up
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    {!loggingIn ? (
                        <Grid item xs={12}>
                            <Field
                                name="Enter name:"
                                value={name}
                                setValue={setName}
                                disabled={loading || verifying}
                                type="text"
                                ref={nameInputRef}
                            />
                        </Grid>
                    ) : null}
                    <Grid item xs={12}>
                        <Field
                            name="Enter email:"
                            value={email}
                            setValue={setEmail}
                            disabled={loading || verifying}
                            type="email"
                            ref={emailInputRef}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="Enter password:"
                            value={password}
                            setValue={setPassword}
                            disabled={loading || verifying}
                            type="password"
                        />
                        <IconButton
                            color="secondary"
                            onClick={submit}
                            disabled={loading || verifying}
                        >
                            <ArrowCircleRightIcon />
                        </IconButton>
                    </Grid>
                    {loggingIn ? (
                        <Grid item xs={12}>
                            <button
                                className="reset-password-button"
                                type="button"
                                onClick={() => setResetPasswordModalOpen(true)}
                            >
                                <span className="hover-underline-animation">
                                    Forgot password?
                                </span>
                            </button>
                        </Grid>
                    ) : null}
                    {loginSignupError ? (
                        <Grid item xs={12}>
                            <Alert severity="error">{loginSignupError}</Alert>
                        </Grid>
                    ) : null}
                </Grid>
            </Box>
        </>
    );
};

export default LoginSignup;

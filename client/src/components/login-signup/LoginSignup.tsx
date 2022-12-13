import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import useKeyDownHandler from "../../hooks/useKeyDownHandler";
import useSnackBar from "../../hooks/useSnackBar";
import Loader from "../Loader";
import Field, { FieldType } from "./Field";

/**
 * Login and signup page.
 */
const LoginSignup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loginSignupError, setLoginSignupError] = useState<string | null>(
        null
    );

    const navigate = useNavigate();
    const location = useLocation();
    const { signup, login } = useAccount();
    const keyDownHandler = useKeyDownHandler();
    const { setOptions: setSnackBarOptions } = useSnackBar();
    const from = location.state?.from?.pathname || "/"; // get from location if there is one

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
        let responseError: string | null = null;

        // call auth functions
        if (loggingIn) {
            responseError = await login({
                email: email,
                password: password,
            });
        } else {
            responseError = await signup({
                name: name,
                email: email,
                password: password,
            });
        }

        // override default password error message
        if (responseError?.startsWith('"password" with value'))
            setLoginSignupError("invalid password");
        else setLoginSignupError(responseError);

        setLoading(false);
        if (!responseError) { // if no error show successful state
            resetFields();
            navigate(from, { replace: true }); // go back to where user was (if applicable)
            setSnackBarOptions({
                message:
                    "Successfully " +
                    (loggingIn
                        ? "logged in"
                        : "signed up - please check email for account activation"),
                type: "success",
                duration: loggingIn ? undefined : 10000,
            });
        }
    };

    // when user presses enter the form submits
    useEffect(() => keyDownHandler("Enter", submit));

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
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ToggleButtonGroup
                            onKeyDown={(e) => {}}
                            color="primary"
                            value={loggingIn ? "login" : "signup"}
                            exclusive
                            onChange={toggleLoggingIn}
                            disabled={loading}
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
                                disabled={loading}
                                type={FieldType.text}
                            />
                        </Grid>
                    ) : null}
                    <Grid item xs={12}>
                        <Field
                            name="Enter email:"
                            value={email}
                            setValue={setEmail}
                            disabled={loading}
                            type={FieldType.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="Enter password:"
                            value={password}
                            setValue={setPassword}
                            disabled={loading}
                            type={FieldType.password}
                        />
                        <IconButton onClick={submit} disabled={loading}>
                            <ArrowCircleRightIcon />
                        </IconButton>
                    </Grid>
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

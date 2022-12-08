import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SnackBarContext from "../../context/SnackBarProvider";
import useAccount from "../../hooks/useAccount";
import Loader from "../Loader";
import Field, { FieldType } from "./Field";

const LoginSignup = () => {
    const navigate = useNavigate();
    const { setMessage: setSnackBarMessage } = useContext(SnackBarContext);

    const [loggingIn, setLoggingIn] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [loginSignupError, setLoginSignupError] = useState("");

    const { signup, login } = useAccount();

    useEffect(() => setLoginSignupError(""), [name, email, password]);

    const resetFields = () => {
        setName("");
        setEmail("");
        setPassword("");
    };

    const toggleLoggingIn = () => {
        setLoggingIn((previous) => !previous);
        resetFields();
    };

    const submit = async () => {
        setLoading(true);
        let responseError = "";

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

        if (responseError.startsWith('"password" with value'))
            setLoginSignupError("invalid password");
        else setLoginSignupError(responseError);

        setLoading(false);
        if (!responseError) {
            resetFields();
            navigate(-1);
            setSnackBarMessage(
                "Successfully " + (loggingIn ? "logged in" : "signed up")
            );
        }
    };

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

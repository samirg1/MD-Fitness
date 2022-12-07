import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import Field, { FieldType } from "./Field";
import LoginSignupButton from "./LoginSignupButton";

const LoginSignup = () => {
    const [loggingIn, setLoggingIn] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fieldsDisabled, setFieldsDisabled] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loginSignupError, setLoginSignupError] = useState("");

    useEffect(() => setLoginSignupError(""), [name, email, password]);

    const toggleLoggingIn = () => {
        setLoggingIn((previous) => !previous);
        setName("");
        setEmail("");
        setPassword("");
    };

    const submit = () => {
        setFieldsDisabled(true);
        setLoading(true);
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
                        <LoginSignupButton
                            text="Login"
                            disabled={loggingIn}
                            onClick={toggleLoggingIn}
                        />
                        <LoginSignupButton
                            text="Signup"
                            disabled={!loggingIn}
                            onClick={toggleLoggingIn}
                        />
                    </Grid>
                    {!loggingIn ? (
                        <Grid item xs={12}>
                            <Field
                                name="Enter name:"
                                value={name}
                                setValue={setName}
                                disabled={fieldsDisabled}
                                type={FieldType.text}
                            />
                        </Grid>
                    ) : null}
                    <Grid item xs={12}>
                        <Field
                            name="Enter email:"
                            value={email}
                            setValue={setEmail}
                            disabled={fieldsDisabled}
                            type={FieldType.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="Enter password:"
                            value={password}
                            setValue={setPassword}
                            disabled={fieldsDisabled}
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

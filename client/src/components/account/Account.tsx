import { EditOutlined, SaveOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import useStripe from "../../hooks/useStripe";
import PageTitle from "../PageTitle";
import "./Account.css";
import AccountHeader from "./AccountHeader";
import EditableField from "./EditableField";

/**
 * Main page for the user's account and profile.
 */
const Account = () => {
    const [isEditing, setIsEditing] = useState(false);

    const { authentication } = useAuthentication();
    const { addUserPurchase } = useStripe();
    const [searchParams, setSearchParams] = useSearchParams();

    const [newName, setNewName] = useState(authentication!.name);
    const [newEmail, setNewEmail] = useState(authentication!.email);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        const session_id = searchParams.get("session_id");
        const product_id = searchParams.get("product_id");
        if (session_id && product_id && authentication) {
            addUserPurchase(session_id, product_id, authentication.email);
            setSearchParams();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditingClick = () => {
        setIsEditing((previous) => !previous);
    };

    return (
        <Box
            style={{
                position: "absolute",
                top: "15%",
                left: "10%",
                right: "10%",
            }}
        >
            <PageTitle size="small">ACCOUNT</PageTitle>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <AccountHeader title="Name" />
                    <EditableField
                        isEditing={isEditing}
                        type="text"
                        value={newName}
                        setValue={setNewName}
                        error={nameError}
                        setError={setNameError}
                    />
                </Grid>
                <Grid item xs={5}>
                    <AccountHeader title="Email" />
                    <EditableField
                        isEditing={isEditing}
                        type="email"
                        value={newEmail}
                        setValue={setNewEmail}
                        error={emailError}
                        setError={setEmailError}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <button id="fieldEditing" onClick={handleEditingClick} disabled={nameError || emailError}>
                            {isEditing ? (
                                <>
                                    <SaveOutlined color="secondary" />
                                    Save
                                </>
                            ) : (
                                <>
                                    <EditOutlined color="secondary" />
                                    Edit
                                </>
                            )}
                        </button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <AccountHeader title="Programs" />
                </Grid>
            </Grid>
            <div style={{ color: "white" }}>
                This is the account page for {authentication?.name}{" "}
                {authentication?.purchases}
            </div>
        </Box>
    );
};

export default Account;

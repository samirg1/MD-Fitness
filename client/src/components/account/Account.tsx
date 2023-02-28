import { EditOutlined, SaveOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import useAuthentication from "../../hooks/useAuthentication";
import useStripe from "../../hooks/useStripe";
import Loader from "../Loader";
import PageTitle from "../PageTitle";
import "./Account.css";
import AccountHeader from "./AccountHeader";
import EditableField from "./EditableField";

/**
 * Main page for the user's account and profile.
 */
const Account = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { authentication } = useAuthentication();
    const { editUser } = useAccount();
    const { addUserPurchase } = useStripe();
    const [searchParams, setSearchParams] = useSearchParams();

    const [newName, setNewName] = useState(authentication!.name);
    const [newEmail, setNewEmail] = useState(authentication!.email);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const onConfirmPasswordChange: React.Dispatch<
        React.SetStateAction<string>
    > = (newValue: SetStateAction<string>) => {
        setConfirmPassword(newValue);
        if (newValue !== newPassword) setEditingError("Passwords do not match");
    };

    const [editingError, setEditingError] = useState<string | null>(null);

    useEffect(() => {
        const session_id = searchParams.get("session_id");
        const product_id = searchParams.get("product_id");
        if (session_id && product_id && authentication) {
            addUserPurchase(session_id, product_id, authentication.email);
            setSearchParams();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditingClick = async () => {
        if (!isEditing) return setIsEditing(true);

        if (newName === authentication!.name && newEmail === authentication!.email && newPassword === "") return setIsEditing(false);

        setIsLoading(true);
        const editingError = await editUser(authentication!.email, {
            name: newName,
            email: newEmail,
            password: newPassword,
        });

        if (editingError === null) setIsEditing(false);

        if (editingError?.startsWith('"password" with value'))
            setEditingError(
                "invalid password - must be 8 characters long with an uppercase letter, lowercase letter, number and special character"
            );
        else setEditingError(editingError);

        setIsLoading(false);
    };

    return (
        <>
            <Loader isLoading={isLoading} />
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
                            error={editingError}
                            setError={setEditingError}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <AccountHeader title="Email" />
                        <EditableField
                            isEditing={isEditing}
                            type="email"
                            value={newEmail}
                            setValue={setNewEmail}
                            error={editingError}
                            setError={setEditingError}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <button
                                id="fieldEditing"
                                onClick={handleEditingClick}
                                disabled={Boolean(editingError)}
                            >
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
                        <p style={{ color: "red", textAlign: "center" }}>
                            {editingError}
                        </p>
                    </Grid>
                    <Grid item xs={5}>
                        <AccountHeader title="Password" />
                        <EditableField
                            isEditing={isEditing}
                            type="password"
                            value={newPassword}
                            setValue={setNewPassword}
                            error={editingError}
                            setError={setEditingError}
                        />
                    </Grid>
                    {isEditing ? (
                        <Grid item xs={5}>
                            <AccountHeader title="Confirm Password" />
                            <EditableField
                                isEditing={isEditing}
                                type="password"
                                value={confirmPassword}
                                setValue={onConfirmPasswordChange}
                                error={editingError}
                                setError={setEditingError}
                            />
                        </Grid>
                    ) : (
                        ""
                    )}
                    <Grid item xs={isEditing ? 2 : 7}></Grid>
                    <Grid item xs={12}>
                        <AccountHeader title="Programs" />
                    </Grid>
                </Grid>
                <div style={{ color: "white" }}>
                    This is the account page for {authentication?.name}{" "}
                    {authentication?.purchases}
                </div>
            </Box>
        </>
    );
};

export default Account;

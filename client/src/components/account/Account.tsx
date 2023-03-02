import { EditOutlined, SaveOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SetStateAction, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import useAuthentication from "../../hooks/useAuthentication";
import useStripe, { TViewProduct } from "../../hooks/useStripe";
import Card from "../Card";
import Loader from "../Loader";
import PageTitle from "../PageTitle";
import "./Account.css";
import AccountHeader from "./AccountHeader";
import EditableField from "./EditableField";
import ProgramView from "./ProgramView";

/**
 * Main page for the user's account and profile.
 */
const Account = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { authentication } = useAuthentication();
    const { editUser } = useAccount();
    const location = useLocation();
    const { addUserPurchase, getProductById } = useStripe();
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState<TViewProduct[]>([]);

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

    const [productOpen, setProductOpen] = useState<TViewProduct | null>(null);

    useEffect(() => {
        const addPurchase = async () => {
            const session_id = searchParams.get("session_id");
            const product_id = searchParams.get("product_id");
            if (session_id && product_id && authentication) {
                setIsLoading(true);
                await addUserPurchase(
                    session_id,
                    product_id,
                    authentication.email
                );
                setIsLoading(false);
                setSearchParams();
            }
        };

        const getPurchases = async () => {
            const products: TViewProduct[] = [];
            await Promise.all(
                authentication!.purchases.map(async (purchaseId) => {
                    const product = await getProductById(purchaseId);
                    if (product !== null) products.push(product);
                })
            );

            if (location?.state?.to) {
                const product = products.find(
                    (product) => product.id === location.state.to
                );
                if (product) setProductOpen(product);
            }

            setProducts(products);
        };

        addPurchase();
        getPurchases();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditingClick = async () => {
        if (!isEditing) return setIsEditing(true);

        if (
            newName === authentication!.name &&
            newEmail === authentication!.email &&
            newPassword === ""
        )
            return setIsEditing(false);

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
            <ProgramView
                product={productOpen}
                handleClose={() => setProductOpen(null)}
            />
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
                    <Grid item xs={12}>
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
                        <span style={{ color: "red" }}>{editingError}</span>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
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
                        <Grid item xs>
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
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
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
                            <Grid item xs>
                                <AccountHeader title="Confirm" />
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
                    </Grid>
                    <Grid item xs={12}>
                        <AccountHeader title="My Programs" />
                        <ul>
                            {products.map((product) => (
                                <li
                                    key={product.id}
                                    style={{ paddingBottom: "20px" }}
                                >
                                    <Card
                                        title={product.name}
                                        navTitle={"Go"}
                                        onClick={() => setProductOpen(product)}
                                        disabled={isLoading}
                                    />
                                </li>
                            ))}
                        </ul>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Account;

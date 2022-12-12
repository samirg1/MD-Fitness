import useAuthentication from "../../hooks/useAuthentication";

/**
 * Main page for the user's account and profile.
 */
const Account = () => {
    const { authentication } = useAuthentication();

    return <div>This is the account page for {authentication?.name}</div>;
};

export default Account;

import useAuthentication from "../../hooks/useAuthentication";

const Account = () => {
    const { authentication } = useAuthentication();

    return <div>This is the account page for {authentication?.name}</div>;
};

export default Account;

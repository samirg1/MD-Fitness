import DefaultPage from "./DefaultPage";

/**
 * Page that displays when the user is not authorised to access the page they were after.
 */
const Unauthorised = () => {
    return (
        <DefaultPage
            displayText="You are not authorised to access this page"
            back
        />
    );
};

export default Unauthorised;

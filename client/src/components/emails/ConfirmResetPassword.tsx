import EmailTemplate from "./EmailTemplate";

const ConfirmResetPassword = () => (
    <EmailTemplate
        title="Password change"
        mainText="Your password has been successfully changed."
        smallText="If this wasn't you, please contact me as soon as possible to resolve this issue."
    />
);

export default ConfirmResetPassword;

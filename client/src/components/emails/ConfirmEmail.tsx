import { Link } from "@react-email/components";
import EmailTemplate from "./EmailTemplate";

const ConfirmEmail = () => (
    <EmailTemplate
        title="Confirm your email address"
        mainText="Click the link below to confirm your email and get started."
        smallText="If you didn't request this email, there's nothing to worry about - you can safely ignore it."
        codeBoxContent={
            <Link
                style={{
                    fontSize: "30px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    textTransform: "uppercase",
                }}
                href={`${process.env.REACT_APP_DOMAIN}/confirm-email/%CONFIRMATION_TOKEN%`}
                target="_blank"
                rel="noopener noreferrer"
            >
                confirm
            </Link>
        }
    />
);

export default ConfirmEmail;

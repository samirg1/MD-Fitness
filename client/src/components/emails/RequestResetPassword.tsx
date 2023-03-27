import { Text } from "@react-email/components";
import EmailTemplate from "./EmailTemplate";

const RequestResetPassword = () => (
    <EmailTemplate
        title="Request to reset password"
        mainText="Use the code below to reset your password."
        smallText="If you didn't request this email, please contact me as soon as possible through the social links below to resolve this issue."
        codeBoxContent={
            <Text
                style={{
                    fontSize: "30px",
                    textAlign: "center" as const,
                    verticalAlign: "middle",
                }}
            >
                %RESET_CODE%
            </Text>
        }
    />
);

export default RequestResetPassword;

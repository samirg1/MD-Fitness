import { graphQLRequest } from "../api/server";
import { EmailType, renderEmail } from "../components/emails/renderEmail";

const useResetPassword = () => {
    const requestResetCode = async (userEmail: string) => {
        const emailHtml = renderEmail(EmailType.requestResetPassword);
        return await graphQLRequest(
            `mutation {
                resetPassword {
                    requestResetCode(userEmail: "${userEmail}", emailHtml: "${emailHtml}")
                }
            }`
        );
    };

    const resetPassword = async (
        userEmail: string,
        resetPasswordCode: string,
        newPassword: string
    ) => {
        const emailHtml = renderEmail(EmailType.confirmResetPassword);
        return await graphQLRequest(
            `mutation {
                resetPassword {
                    reset(userEmail: "${userEmail}", resetPasswordCode: "${resetPasswordCode}", newPassword: "${newPassword}", emailHtml: "${emailHtml}")
                }
            }`
        );
    };

    return { requestResetCode, resetPassword };
};

export default useResetPassword;

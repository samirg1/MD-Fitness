import { useNavigate } from "react-router-dom";
import { graphQLRequest } from "../api/server";
import { EmailType, renderEmail } from "../components/emails/renderEmail";
import useAuthentication from "./useAuthentication";
import useSnackBar from "./useSnackBar";

/**
 * Hook to use account functionality.
 * @returns Functions for logging in, signing up and logging out.
 */
const useAccount = () => {
    const { setAuthentication } = useAuthentication();
    const { setOptions: setSnackBarMessage } = useSnackBar();
    const navigate = useNavigate();

    /**
     * Sign a user up.
     * @param payload The signup details.
     * @returns The error if any occured.
     */
    const signup = async (payload: TSignup): Promise<string | null> => {
        const { name, email, password } = payload;
        return await graphQLRequest<{
            authentication: { signup: { email: string } };
        }>(
            `mutation {
                authentication {
                    signup(name: "${name}", email: "${email}", password: "${password}") {
                        email
                    }
                }
            }`,
            (data) => sendConfirmationEmail(data.authentication.signup.email)
        );
    };

    /**
     * Log a user in.
     * @param payload The login details.
     * @returns The error if any occured.
     */
    const login = async (payload: TLogin): Promise<string | null> => {
        const { email, password } = payload;
        return await graphQLRequest<{
            authentication: { login: TAuthentication };
        }>(
            `mutation {
                authentication {
                    login(email: "${email}", password: "${password}") {
                        name
                        email
                        permissions
                        purchases
                        accessToken
                    }
                }
            }`,
            (data) => setAuthentication(data.authentication.login)
        );
    };

    /**
     * Log a user out.
     * @returns The error if any occured.
     */
    const logout = async (): Promise<string | null> => {
        return await graphQLRequest(
            `mutation {
                authentication {
                    logout
                }
            }`,
            () => {
                setAuthentication(null);
                setSnackBarMessage({
                    message: "Logout successful",
                    type: "success",
                });
                navigate("/");
            }
        );
    };

    /**
     * Send confirmation email.
     * @returns The error if any occured.
     */
    const sendConfirmationEmail = async (userEmail: string) => {
        const emailHtml = renderEmail(EmailType.confirmEmail);
        return await graphQLRequest(
            `mutation {
                confirmation {
                  send(email:"${userEmail}", emailHtml: "${emailHtml}")
                }
            }`
        );
    };

    /**
     * Confirm user's email.
     * @param token The token that contains the user's id.
     * @returns The error if any occured.
     */
    const confirmEmail = async (token: string) => {
        const welcomeEmailHtml = renderEmail(EmailType.welcome);
        return await graphQLRequest(
            `mutation {
                confirmation {
                    confirm(token: "${token}", emailHtml: "${welcomeEmailHtml}")
                }
            }`
        );
    };

    const editUser = async (
        userEmail: string,
        payload: TSignup
    ): Promise<string | null> => {
        const { name, email, password } = payload;
        return await graphQLRequest<{
            editAccount: { editUser: { name: string; email: string } };
        }>(
            `mutation {
                editAccount {
                    editUser(userEmail: "${userEmail}", name: "${name}", email: "${email}", password: "${password}") {
                        name
                        email
                    }
                }
            }`,
            (data) => {
                const { name, email } = data.editAccount.editUser;
                setAuthentication((previous) => ({
                    ...previous!,
                    name,
                    email,
                }));
            }
        );
    };

    return {
        signup,
        login,
        logout,
        sendConfirmationEmail,
        confirmEmail,
        editUser,
    };
};

export default useAccount;

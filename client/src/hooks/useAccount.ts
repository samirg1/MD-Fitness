import { useNavigate } from "react-router-dom";
import { graphQLRequest } from "../api/server";
import { TAuthentication } from "../context/AuthProvider";
import { EmailType, renderEmail } from "../emails/renderEmail";
import useAuthentication from "./useAuthentication";
import useSnackBar from "./useSnackBar";

/**
 * Signup object type.
 */
export type TSignup = {
    name: string;
    email: string;
    password: string;
};
/**
 * Login object type.
 */
export type TLogin = Omit<TSignup, "name">;

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
            (data) =>
                console.log(
                    sendConfirmationEmail(data.authentication.signup.email)
                )
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
    const sendConfirmationEmail = async (email: string) => {
        const emailHtml = renderEmail(EmailType.confirmEmail);
        return await graphQLRequest(
            `mutation {
                confirmation {
                  send(email:"${email}", emailHtml: "${emailHtml}")
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
        return await graphQLRequest(
            `mutation {
                confirmation {
                    confirm(token: "${token}")
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

import { useNavigate } from "react-router-dom";
import { graphQLRequest } from "../api/server";
import useAuthentication from "./useAuthentication";
import useSnackBar from "./useSnackBar";

/**
 * Type of user that is returned from database.
 */
export type TUser = {
    _id: string;
    name: string;
    email: string;
    dateCreated: Date;
    permissions: number[];
    purchases: string[];
};

const useAdmin = () => {
    const { setAuthentication } = useAuthentication();
    const { setOptions: setSnackBarOptions } = useSnackBar();
    const navigate = useNavigate();

    const getUsers = async () => {
        let users: TUser[] = [];
        const error = await graphQLRequest<{
            users: (Omit<TUser, "dateCreated"> & { dateCreated: string })[];
        }>(
            `query {
                users {
                    _id
                    name
                    email
                    dateCreated
                    permissions
                    purchases
                }
            }`,
            (data) =>
                (users = data.users.map((user) => ({
                    ...user,
                    dateCreated: JSON.parse(user.dateCreated) as Date,
                })))
        );

        if (error) {
            setAuthentication(null);
            setSnackBarOptions({
                message: `${error}. You have been logged out.`,
                type: "info",
            });
            navigate("/login-signup");
        }
        return users;
    };

    return { getUsers };
};

export default useAdmin;

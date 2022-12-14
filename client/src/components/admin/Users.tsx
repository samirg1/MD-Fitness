import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPrivateRequest } from "../../api/server";
import useAuthentication from "../../hooks/useAuthentication";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useSnackBar from "../../hooks/useSnackBar";
import Loader from "../Loader";

const USERS_URL = "/users";

/**
 * Type of user that is returned from database.
 */
type TUsers = {
    _id: string;
    name: string;
    email: string;
    dateCreated: Date;
    permissions: number[];
};

/**
 * Users component for displaying the current users of the application in the database.
 */
const Users = () => {
    const [users, setUsers] = useState<TUsers[]>([]);
    const [loading, setLoading] = useState(false);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthentication } = useAuthentication();
    const { setOptions: setSnackBarOptions } = useSnackBar();

    // get users with a private request
    useEffect(() => {
        setLoading(true);
        let isMounted = true;
        const controller = new AbortController();

        getPrivateRequest(
            USERS_URL,
            controller.signal,
            (response) => {
                isMounted && setUsers(response.data);
                setLoading(false);
            },
            () => {
                setAuthentication(null);
                setSnackBarOptions({
                    message: "Please log in again",
                    type: "info",
                });
                navigate("/login-signup", {
                    state: { from: location },
                    replace: true,
                });
            }
        );

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [
        axiosPrivate,
        location,
        navigate,
        setAuthentication,
        setSnackBarOptions,
    ]);

    return (
        <article>
            <Loader isLoading={loading}/>
            <h2>Users List</h2>
            {users.length ? (
                <ul>
                    {users.map((user) => (
                        <li
                            key={user._id}
                        >{`${user.name} - ${user.email} - ${user.dateCreated} - ${user.permissions}`}</li>
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
        </article>
    );
};

export default Users;

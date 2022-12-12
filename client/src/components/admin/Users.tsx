import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useSnackBar from "../../hooks/useSnackBar";

const USERS_URL = "/users";

type TUsers = {
    _id: string;
    name: string;
    email: string;
    dateCreated: Date;
    permissions: number[];
}

const Users = () => {
    const [users, setUsers] = useState<TUsers[]>([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthentication } = useAuthentication();
    const { setOptions: setSnackBarOptions } = useSnackBar();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(USERS_URL, {
                    signal: controller.signal,
                });
                // console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (error: any) {
                if (error.code !== "ERR_CANCELED") {
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
            }
        };

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate, location, navigate, setAuthentication, setSnackBarOptions]);

    return (
        <article>
            <h2>Users List</h2>
            {users.length ? (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>{`${user.name} - ${user.email} - ${user.dateCreated} - ${user.permissions}`}</li>
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
        </article>
    );
};

export default Users;

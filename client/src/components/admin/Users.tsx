import { useEffect, useState } from "react";
import { TAuthentication } from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const USERS_URL = "/users";

const Users = () => {
    const [users, setUsers] = useState<TAuthentication[]>([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(USERS_URL, {
                    signal: controller.signal,
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (error) {
                console.error(error);
                //navigate('/login-signup', { state: { from: location }, replace: true });
            }
        };

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate, location, navigate]);

    return (
        <article>
            <h2>Users List</h2>
            {users.length ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.name}>{user.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
        </article>
    );
};

export default Users;

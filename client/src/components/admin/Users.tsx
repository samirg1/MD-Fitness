import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import useAdmin, { TUser } from "../../hooks/useAdmin";
import Loader from "../Loader";

/**
 * Users component for displaying the current users of the application in the database.
 */
const Users = () => {
    const [users, setUsers] = useState<TUser[]>([]);
    const [loading, setLoading] = useState(false);
    const { getUsers } = useAdmin();

    // get users with a private request
    useEffect(() => {
        setLoading(true);

        const getAllUsers = async () => {
            const users = await getUsers();
            setUsers(users);
            setLoading(false);
        };

        getAllUsers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Loader isLoading={loading} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, maxHeight: 800 }} aria-label="simple table">
                    <TableHead sx={{bgcolor: "grey"}}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Permissions</TableCell>
                            <TableCell>Purchases</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={"row-" + user._id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                {Object.entries(user)
                                    .slice(1)
                                    .map(([key, value]) => {
                                        return (
                                            <TableCell
                                                key={key + " " + user._id}
                                            >{`${value}`}</TableCell>
                                        );
                                    })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Users;

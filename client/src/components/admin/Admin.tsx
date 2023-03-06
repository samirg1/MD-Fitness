import Box from "@mui/material/Box";
import Users from "./Users";

/**
 * Main page for the admin interface.
 */
const Admin = () => {
    return (
        <Box
            style={{
                position: "absolute",
                top: "15%",
                left: "10%",
                right: "10%",
            }}
        >
            <Users />
        </Box>
    );
};

export default Admin;

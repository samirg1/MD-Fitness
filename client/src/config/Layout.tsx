import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/app-bar/AppBar";
import SnackBar from "../components/SnackBar";

const pages = ["Programs"];

const Layout = () => {
    return (
        <>
            <main className="App">
                <ResponsiveAppBar pages={pages} />
                <SnackBar />
                <Outlet />
            </main>
        </>
    );
};

export default Layout;

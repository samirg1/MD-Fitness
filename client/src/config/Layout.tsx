import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/app-bar/AppBar";
import SnackBar from "../components/SnackBar";

const PAGES = ["Programs"];

/**
 * Layout parent component for the application.
 */
const Layout = () => {
    return (
        <main className="App">
            <ResponsiveAppBar pages={PAGES} />
            <SnackBar />
            <Outlet />
        </main>
    );
};

export default Layout;

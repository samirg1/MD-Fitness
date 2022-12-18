import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/app-bar/AppBar";
import SnackBar from "../components/SnackBar";
import { PUBLIC_PAGES } from "./pages";

/**
 * Layout parent component for the application.
 */
const Layout = () => {
    return (
        <main className="App">
            <ResponsiveAppBar pages={Object.values(PUBLIC_PAGES)} />
            <SnackBar />
            <Outlet />
        </main>
    );
};

export default Layout;

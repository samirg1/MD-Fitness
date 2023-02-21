import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import LINKS from "../../config/links";
import {
    ADMIN_SETTINGS,
    PUBLIC_SETTINGS,
    USER_SETTINGS,
} from "../../config/pages";
import PERMISSIONS from "../../config/permissions";
import { TAuthentication } from "../../context/AuthProvider";
import useAuthentication from "../../hooks/useAuthentication";
import Loader from "../Loader";
import TiktokIcon from "../TiktokIcon";
import "./AppBar.css";
import AppBarIconText from "./AppBarIconText";
import LinkButton from "./LinkButton";
const LogoutPopup = lazy(() => import("./LogoutPopup"));

/**
 * Responsive app bar component that changes depending on screen width.
 * @param pages The list of pages to display in app bar.
 */
const ResponsiveAppBar = ({ pages }: { pages: string[] }) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);

    const navigate = useNavigate();
    const { authentication } = useAuthentication();

    const getSettings = (authentication: TAuthentication | null): string[] => {
        if (!authentication) return Object.values(PUBLIC_SETTINGS);

        if (!authentication.permissions.includes(PERMISSIONS.admin))
            return Object.values(USER_SETTINGS);

        return Object.values(ADMIN_SETTINGS);
    };

    const settings: string[] = getSettings(authentication);

    /**
     * Opens the navigation menu.
     * @param event The event that caused this function.
     */
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    /**
     * Opens the user menu.
     * @param event The event that caused this function.
     */
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    /**
     * Closes the navigation menu.
     */
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    /**
     * Closes the user menu.
     */
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /**
     * Changes the current page of the app.
     * @param page the page to switch to.
     */
    const changePage = (page: string) => {
        navigate(`/${page.toLowerCase()}`);
        handleCloseNavMenu();
    };

    /**
     * Handle the selection of a setting.
     * @param setting The setting that was selected.
     */
    const handleSettingClicked = (setting: string) => {
        switch (setting) {
            case PUBLIC_SETTINGS.loginSignup:
                changePage("login-signup");
                break;
            case USER_SETTINGS.logout:
                setLogoutPopupOpen(true);
                break;
            case ADMIN_SETTINGS.admin:
                changePage("admin");
                break;
            case USER_SETTINGS.accountPage:
                changePage("account");
                break;
            default:
                changePage("not-a-real-page"); // will send to page not found
        }
        handleCloseUserMenu();
    };

    return (
        <AppBar position="static" color="primary">
            {logoutPopupOpen ? (
                <Suspense fallback={<Loader isLoading />}>
                    <LogoutPopup
                        open={logoutPopupOpen}
                        handleClose={() => setLogoutPopupOpen(false)}
                    />
                </Suspense>
            ) : null}
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AppBarIconText large />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* Menu and menu item for each page if width is too small */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => changePage(page)}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AppBarIconText large={false} />
                    {/* Buttons for each page if width pertains */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Tooltip
                                title={`View ${page.toLowerCase()}`}
                                key={page}
                            >
                                <Button
                                    className="page-button"
                                    onClick={() => changePage(page)}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {page}
                                </Button>
                            </Tooltip>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <LinkButton
                            url={LINKS.instagram}
                            icon={<InstagramIcon sx={{ color: "white" }} />}
                            title="Open Instagram account"
                        />
                        <LinkButton
                            url={LINKS.tiktok}
                            icon={<TiktokIcon />}
                            title="Open TikTok account"
                        />
                        <Tooltip title="Open account settings">
                            <IconButton onClick={handleOpenUserMenu}>
                                {authentication ? (
                                    <Avatar>{authentication.name[0]}</Avatar>
                                ) : (
                                    <AccountCircleIcon
                                        sx={{ color: "white" }}
                                    />
                                )}
                            </IconButton>
                        </Tooltip>
                        {/* Menu and menu item for each settings page */}
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={() =>
                                        handleSettingClicked(setting)
                                    }
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;

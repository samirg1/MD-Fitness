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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import permissions from "../../config/permissionsList";
import useAuthentication from "../../hooks/useAuthentication";
import AppBarIconText from "./AppBarIconText";
import LogoutPopup from "./LogoutPopup";

const APP_NAME = "MD FITNESS";

const LINKS = {
    Instagram: "https://instagram.com/mdonaldfit/",
};

enum AccountAction {
    accountPage = "Account",
    logout = "Logout",
    loginSignup = "Login / Signup",
    admin = "Admin",
}

const ResponsiveAppBar = ({ pages }: { pages: string[] }) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
    const navigate = useNavigate();
    const { authentication } = useAuthentication();

    const settings: string[] = [];
    if (authentication) {
        settings.push(AccountAction.accountPage, AccountAction.logout);
        authentication.permissions.includes(permissions.admin) &&
            settings.push(AccountAction.admin);
    } else settings.push(AccountAction.loginSignup);

    /**
     * Opens the navigation menu
     * @param event The event that caused this function
     */
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    /**
     * Opens the user menu
     * @param event The event that caused this function
     */
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    /**
     * Closes the navigation menu
     */
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    /**
     * Closes the user menu
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

    const handleSettingClicked = (setting: string) => {
        switch (setting) {
            case AccountAction.loginSignup:
                changePage("login-signup");
                break;
            case AccountAction.logout:
                setLogoutPopupOpen(true);
                break;
            case AccountAction.admin:
                changePage("admin");
                break;
            case AccountAction.accountPage:
                changePage("account");
                break;
            default:
                changePage("not-a-real-page"); // will send to page not found
        }
        handleCloseUserMenu();
    };

    const openLink = (link: string) => {
        window.open(link, "_blank");
    };

    return (
        <AppBar position="static" color="primary">
            {logoutPopupOpen ? (
                <LogoutPopup
                    open={logoutPopupOpen}
                    handleClose={() => setLogoutPopupOpen(false)}
                />
            ) : null}
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AppBarIconText large name={APP_NAME} />
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
                    <AppBarIconText large={false} name={APP_NAME} />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => changePage(page)}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open Instagram account">
                            <IconButton
                                onClick={() => openLink(LINKS.Instagram)}
                            >
                                <InstagramIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Open account settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                {authentication ? (
                                    <Avatar>{authentication.name[0]}</Avatar>
                                ) : (
                                    <AccountCircleIcon
                                        sx={{ color: "white" }}
                                    />
                                )}
                            </IconButton>
                        </Tooltip>
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

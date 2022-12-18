import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { APP_ICON, APP_NAME } from "../../config/details";

/**
 * The app bar icon and title component.
 * @param large Whether the icon and app name are displayed in large mode (width wise) or not.
 */
const AppBarIconText = ({ large }: { large: boolean }) => {
    return (
        <>
            <Avatar
                alt="MDFit"
                src={APP_ICON}
                sx={{
                    display: {
                        xs: large ? "none" : "flex",
                        md: large ? "flex" : "none",
                    },
                    mr: 1,
                }}
            />
            <Typography
                variant={large ? "h6" : "h5"}
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: {
                        xs: large ? "none" : "flex",
                        md: large ? "flex" : "none",
                    },
                    fontFamily: "arial",
                    fontWeight: 700,
                    color: "inherit",
                    textDecoration: "none",
                    flexGrow: Number(!large),
                }}
            >
                {APP_NAME}
            </Typography>
        </>
    );
};

export default AppBarIconText;

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const AppIcon = require("../../img/icon.jpg");

const AppBarIconText = ({ large, name }: { large: boolean; name: string }) => {
    return (
        <>
            <Avatar
                alt="MDFit"
                src={AppIcon}
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
                {name}
            </Typography>
        </>
    );
};

export default AppBarIconText;

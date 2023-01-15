import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const LinkButton = ({
    url,
    icon,
    title,
}: {
    url: string;
    icon: JSX.Element;
    title: string;
}) => {
    /**
     * Open a link in a new tab.
     * @param link The link to open.
     */
    const openLink = (link: string) => {
        window.open(link, "_blank");
    };
    return (
        <Tooltip title={title}>
            <IconButton onClick={() => openLink(url)}>
                {icon}
            </IconButton>
        </Tooltip>
    );
};

export default LinkButton;

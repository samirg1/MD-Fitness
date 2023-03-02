import { CircularProgressProps, SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { TViewProduct } from "../../hooks/useStripe";
import "./ProgramView.css";

type TProgramView = {
    product: TViewProduct | null;
    handleClose: () => void;
};

/**
 * Component to display the progress of a program.
 * @param props Props to pass to the CircularProgress component.
 * @returns CircularProgress with a label.
 */
const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number }
) => (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
            sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography
                variant="caption"
                component="div"
                color="white"
                sx={{ bgcolor: "#26499d", borderRadius: "50%", padding: "5px" }}
            >{`${Math.round(props.value)}%`}</Typography>
        </Box>
    </Box>
);

const popupStyle: SxProps<Theme> = (theme) => ({
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    bgcolor: theme.palette.primary.main,
    border: "2px solid #000",
    padding: "2%",
    color: "white",
    borderRadius: "40px",
    overflowX: "scroll",
});

/**
 * Displays the program view.
 */
const ProgramView = ({ product, handleClose }: TProgramView) => {
    /**
     * Collapses the div with the given id.
     * @param id The id of the div to collapse.
     * @returns Function to be called when the collapse button is clicked.
     */
    function toggleCollapsed(id: string) {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            const element = document.getElementById(id);
            if (element === null) return;

            const present = element.classList.toggle("collapsed");
            event.currentTarget.innerText = present ? "+" : "-";
        };
    }

    /**
     * Convert the program object into JSX to display it.
     * @param object The object to display.
     * @param level The current depth of the object.
     * @param currentId The current id of the object.
     * @returns The JSX to display the whole object.
     */
    function getProgramStructure(
        object: { [key: string]: string } | string,
        level: number = 2,
        currentId: string = ""
    ) {
        if (typeof object === "string") return <p>{object}</p>;

        const Header = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        return Object.entries(object).map(([currentKey, nextObject]) => {
            const id = `${currentId}-${currentKey}`;
            return (
                <div
                    id={id}
                    key={currentKey}
                    className="unselectable collapsed"
                >
                    <div style={{ display: "inline" }}>
                        <Header
                            style={{ display: "inline", paddingRight: "10px" }}
                        >
                            {currentKey}
                        </Header>
                        <button
                            className="collapse-button"
                            type="button"
                            onClick={toggleCollapsed(id)}
                        >
                            +
                        </button>
                        <br /> <br />
                    </div>
                    {getProgramStructure(nextObject, level + 1, id)}
                </div>
            );
        });
    }

    return product !== null ? (
        <Modal open onClose={handleClose}>
            <Box sx={popupStyle}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    {product.name}
                                </Grid>
                                <Grid item xs textAlign={"right"} paddingRight="20px">
                                    <CircularProgressWithLabel
                                        value={30}
                                        sx={{
                                            color: "#39FF14",
                                            backgroundColor: "#3f51b5",
                                            borderRadius: "50%",
                                            alignContent: "right",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </h1>
                    </Grid>
                    <Grid item xs={12}>
                        {getProgramStructure(product.metadata)}
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    ) : (
        <></>
    );
};

export default ProgramView;

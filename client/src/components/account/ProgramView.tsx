import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TViewProduct } from "../../hooks/useStripe";

type TProgramView = {
    product: TViewProduct | null;
    handleClose: () => void;
};

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
    return product !== null ? (
        <Modal open onClose={handleClose}>
            <Box sx={popupStyle}>
                <iframe
                    className="programView"
                    title="Program View"
                    src={product.metadata.link}
                    style={{
                        width: "96%",
                        height: "96%",
                        border: "1px solid white",
                        padding: "2%",
                        borderRadius: "40px",
                    }}
                ></iframe>
            </Box>
        </Modal>
    ) : (
        <></>
    );
};

export default ProgramView;

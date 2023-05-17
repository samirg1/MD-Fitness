import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import "./ProgramView.css";

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
                    onLoad={() => {
                        const frame =
                            document.getElementsByClassName("programView")[0];

                        const url = product.metadata.link;
                        let newDiv = document.createElement("div");
                        newDiv.style.userSelect = "none";

                        // newDiv.classList.add("embeddedProgram");
                        frame.parentElement!.replaceChild(newDiv, frame);

                        try {
                            const xhr = new XMLHttpRequest();
                            xhr.onreadystatechange = function () {
                                if (
                                    xhr.readyState === 4 &&
                                    xhr.status === 200
                                ) {
                                    newDiv.innerHTML = xhr.responseText;
                                }
                            };
                            xhr.onerror = function() {
                                newDiv.innerHTML = `<p>ON ERROR: Failed to load program. ${xhr.statusText}</p>`;
                              };
                            xhr.open("GET", url, false);
                            xhr.send();
                        } catch (e) {
                            newDiv.innerHTML = `<p>Error: Failed to load program. ${e}</p>`;
                        }
                    }}
                    className="programView"
                    title="Program View"
                    src={product.metadata.link}
                    style={{ border: "none" }}
                ></iframe>
            </Box>
        </Modal>
    ) : (
        <></>
    );
};

export default ProgramView;

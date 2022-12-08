import { useContext } from "react";
import SnackBarContext from "../context/SnackBarProvider";

const useSnackBar = () => {
    return useContext(SnackBarContext)
}

export default useSnackBar;
import { useContext } from "react";
import SnackBarContext from "../context/SnackBarProvider";

/**
 * Hook to get the snackbar context.
 * @returns The snackbar context.
 */
const useSnackBar = () => {
    return useContext(SnackBarContext)
}

export default useSnackBar;
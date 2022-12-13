import { createContext, useState } from "react";

/**
 * Snackbar options state type.
 */
type TSnackBarOptions = {
    message: string;
    type: "error" | "warning" | "info" | "success";
    duration?: number;
};

/**
 * Context interface
 */
interface TSnackBarContext {
    options: TSnackBarOptions | null;
    setOptions: React.Dispatch<React.SetStateAction<TSnackBarOptions | null>>;
}

// create the context
const SnackBarContext = createContext<TSnackBarContext>({
    options: null,
    setOptions: () => {},
});

type TChildren = {
    children: JSX.Element[] | JSX.Element;
};

/**
 * Wrapper to provide snackbar functionality and context to child components.
 * @param children The child components of this context. 
 */
export const SnackBarProvider = ({ children }: TChildren) => {
    const [options, setOptions] = useState<TSnackBarOptions | null>(null);

    return (
        <SnackBarContext.Provider value={{ options, setOptions }}>
            {children}
        </SnackBarContext.Provider>
    );
};

export default SnackBarContext;

import { createContext, useState } from "react";

type TSnackBarOptions = {
    message: string;
    type: "error" | "warning" | "info" | "success";
};

interface TSnackBarContext {
    options: TSnackBarOptions | null;
    setOptions: React.Dispatch<React.SetStateAction<TSnackBarOptions | null>>;
}

const SnackBarContext = createContext<TSnackBarContext>({
    options: null,
    setOptions: () => {},
});

type TChildren = {
    children: JSX.Element[] | JSX.Element;
};

export const SnackBarProvider = ({ children }: TChildren) => {
    const [options, setOptions] = useState<TSnackBarOptions | null>(null);

    return (
        <SnackBarContext.Provider value={{ options, setOptions }}>
            {children}
        </SnackBarContext.Provider>
    );
};

export default SnackBarContext;

import { createContext, useState } from "react";

interface TSnackBarContext {
    message: string | null;
    setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const SnackBarContext = createContext<TSnackBarContext>({
    message: null,
    setMessage: () => {},
});

type TChildren = {
    children: JSX.Element[] | JSX.Element;
};

export const SnackBarProvider = ({ children }: TChildren) => {
    const [message, setMessage] = useState<string | null>(null);

    return (
        <SnackBarContext.Provider value={{ message, setMessage }}>
            {children}
        </SnackBarContext.Provider>
    );
};

export default SnackBarContext;

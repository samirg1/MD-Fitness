import { createContext, useState } from "react";

interface TSnackBarContext {
    message: string | null;
    setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const SnackBarContext = createContext<TSnackBarContext>({
    message: null,
    setMessage: () => {},
});

export const SnackBarProvider = ({
    children,
}: {
    children: JSX.Element[] | JSX.Element;
}) => {
    const [message, setMessage] = useState<string | null>(null);

    return (
        <SnackBarContext.Provider value={{ message, setMessage }}>
            {children}
        </SnackBarContext.Provider>
    );
};

export default SnackBarContext;

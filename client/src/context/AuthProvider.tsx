import { createContext, useState } from "react";

/**
 * Type of object that is stored as authentication state.
 */
export type TAuthentication = {
    name: string;
    email: string;
    permissions: number[];
    purchases: string[];
    accessToken: string;
};

/**
 * Interface for context
 */
interface TAuthenticationContext {
    authentication: TAuthentication | null;
    setAuthentication: React.Dispatch<
        React.SetStateAction<TAuthentication | null>
    >;
}

// creating the context
const AuthContext = createContext<TAuthenticationContext>({
    authentication: null,
    setAuthentication: () => {},
});

type TChildren = {
    children: JSX.Element[] | JSX.Element;
};

/**
 * Wrapper to provide authentication context to children components.
 * @param children Child components of the context.
 */
export const AuthProvider = ({ children }: TChildren) => {
    const [authentication, setAuthentication] =
        useState<TAuthentication | null>(null);

    return (
        <AuthContext.Provider value={{ authentication, setAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

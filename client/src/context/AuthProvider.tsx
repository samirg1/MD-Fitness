import { createContext, useState } from "react";

export type TAuthentication = {
    name: string;
    email: string;
    permissions: number[];
    accessToken: string;
};

interface TAuthenticationContext {
    authentication: TAuthentication | null;
    setAuthentication: React.Dispatch<
        React.SetStateAction<TAuthentication | null>
    >;
}

const AuthContext = createContext<TAuthenticationContext>({
    authentication: null,
    setAuthentication: () => {},
});

type TChildren = {
    children: JSX.Element[] | JSX.Element;
};

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

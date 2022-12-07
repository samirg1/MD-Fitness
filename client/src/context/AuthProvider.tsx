import { createContext, useState } from "react";

type TAuthentication = {
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

export const AuthProvider = ({
    children,
}: {
    children: JSX.Element[] | JSX.Element;
}) => {
    const [authentication, setAuthentication] =
        useState<TAuthentication | null>(null);

    return (
        <AuthContext.Provider value={{ authentication, setAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

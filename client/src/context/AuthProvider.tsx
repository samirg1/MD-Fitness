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
    persist: boolean;
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<TAuthenticationContext>({
    authentication: null,
    setAuthentication: () => {},
    persist: false,
    setPersist: () => {},
});

type TChildren = {
    children: JSX.Element[] | JSX.Element;
};

export const AuthProvider = ({ children }: TChildren) => {
    const [authentication, setAuthentication] =
        useState<TAuthentication | null>(null);

    const persistValue = Boolean(
        JSON.parse(localStorage.getItem("persist") || "")
    );
    const [persist, setPersist] = useState(persistValue);

    return (
        <AuthContext.Provider
            value={{ authentication, setAuthentication, persist, setPersist }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

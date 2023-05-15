import ThemeProvider from "@mui/system/ThemeProvider";
import LogRocket from "logrocket";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ErrorFallback from "./components/defaults/ErrorFallback";
import { AuthProvider } from "./context/AuthProvider";
import { SnackBarProvider } from "./context/SnackBarProvider";
import "./index.css";
import theme from "./theme";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
if (process.env.NODE_ENV === "production") disableReactDevTools();

LogRocket.init(process.env.REACT_APP_LOGROCKET_ID as string);
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <SnackBarProvider>
                        <ErrorBoundary fallbackRender={ErrorFallback}>
                            <Routes>
                                <Route path="/*" element={<App />} />
                            </Routes>
                        </ErrorBoundary>
                    </SnackBarProvider>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

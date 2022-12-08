import ThemeProvider from "@mui/system/ThemeProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { SnackBarProvider } from "./context/SnackBarProvider";
import "./index.css";
import theme from "./theme";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <SnackBarProvider>
                        <Routes>
                            <Route path="/*" element={<App />} />
                        </Routes>
                    </SnackBarProvider>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

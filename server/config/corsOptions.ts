import allowedOrigins from "./allowedOrigins";

/**
 * The cors options for the server requests.
 */
export default {
    origin: (
        origin: string | undefined,
        callback: (err: Error | null, success?: boolean) => void
    ) => {
        if (origin === undefined || allowedOrigins.indexOf(origin) === -1) {
            callback(new Error("Not allowed by CORS"));
        } else {
            callback(null, true);
        }
    },
    credentials: true,
    optionSuccessStatus: 200,
};

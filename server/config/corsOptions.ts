import allowedOrigins from "./allowedOrigins.js";

/**
 * The cors options for the server requests.
 */
export default {
    origin: (
        origin: string | undefined,
        callback: (err: Error | null, success?: boolean) => void
    ) => {
        if (origin === undefined || allowedOrigins.indexOf(origin) === -1) {
            console.log(`origin not allowed: ${origin}`)
            callback(null, false);
        } else {
            callback(null, true);
        }
    },
    credentials: true,
    optionSuccessStatus: 200,
};

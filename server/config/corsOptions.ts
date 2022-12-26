import allowedOrigins from "./allowedOrigins";

/**
 * The cors options for the server requests.
 */
export default {
    origin: allowedOrigins,
    credentials: true,
    optionSuccessStatus: 200,
};

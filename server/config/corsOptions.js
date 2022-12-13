const allowedOrigins = require("./allowedOrigins");

/**
 * The cors options for the server requests.
 */
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    optionSuccessStatus: 200,
};

module.exports = corsOptions;

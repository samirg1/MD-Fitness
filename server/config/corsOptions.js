const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    optionSuccessStatus: 200,
};

module.exports = corsOptions;
const jsonwebtoken = require("jsonwebtoken");

/**
 * Sign and create an access token.
 * @param {object} payload The payload to send in the token.
 * @param {string} secret The secret to sign the token with.
 * @param {object | undefined} options Additional options for signing.
 * @returns {string} The signed token.
 */
const signJWT = (payload, secret, options = undefined) => {
    return jsonwebtoken.sign(payload, secret, options);
};

/**
 * Sign and create a refresh token.
 * @param {object} payload The payload to send in the token.
 * @returns {string} The signed token.
 */
const signAccessToken = (payload) => {
    return signJWT(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

/**
 * Sign and create an access token.
 * @param {object} payload The payload to send in the token.
 * @returns {string} The signed token.
 */
const signRefreshToken = (payload) => {
    return signJWT(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "10m",
    });
};

/**
 * Verify an access token.
 * @param {string} token The token to verify.
 * @param {string} secret The secret to verify against.
 * @param {Function} callback The callback function to run once the token has been verified.
 */
const verifyJWT = (token, secret, callback) => {
    jsonwebtoken.verify(token, secret, (error, decoded) =>
        callback(error, decoded)
    );
};

module.exports = { signAccessToken, signRefreshToken, verifyJWT };

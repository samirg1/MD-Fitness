const jsonwebtoken = require("jsonwebtoken");

/**
 * Token types used throughout the application
 */
const tokenTypes = {
    access: {
        secret: process.env.TOKEN_SECRET,
        expiry: 60 * 10, // 10 mins
    },
    refresh: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiry: 60 * 60 * 24, // 1 day
    },
    confirmation: {
        secret: process.env.CONFIRMATION_TOKEN_SECRET,
        expiry: 60 * 60, // 1 hour
    },
};

/**
 * Sign and create an access token.
 * @param {object} payload The payload to send in the token.
 * @param {"access" | "refresh" | "confirmation"} type The type of token to create.
 * @param {object | undefined} options Additional options for signing.
 * @returns {string} The signed token.
 */
const signToken = (payload, type, options = undefined) => {
    options = options || {};
    return jsonwebtoken.sign(payload, tokenTypes[type].secret, {
        ...options,
        expiresIn: tokenTypes[type].expiry,
    });
};

/**
 * Verify a JWT.
 * @param {string} token The token to verify.
 * @param {"access" | "refresh" | "confirmation"} type The type of token to verify.
 * @param {(decoded) => void} callback The callback function to run once the token has been verified.
 * @param {number[] | undefined} permissions The valid permissions for this token to have.
 * @throws {Error} If the token is invalid or authentication is denied.
 */
const verifyToken = (token, type, callback, permissions = undefined) => {
    permissions = permissions || [];
    jsonwebtoken.verify(token, tokenTypes[type].secret, (error, decoded) => {
        if (error) throw new Error("Forbidden error");
        if (!decoded) throw new Error("Invalid credentials");
        if (permissions) {
            const permisionFound = permissions.find((permission) =>
                decoded.permissions.includes(permission)
            );
            if (!permisionFound) throw new Error("Unauthorised access");
        }
        callback(decoded);
    });
};

module.exports = { signToken, verifyToken };

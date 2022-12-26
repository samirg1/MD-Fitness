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
 * Verify a JWT.
 * @param {string} token The token to verify.
 * @param {string} secret The secret to verify against.
 * @param {(error, decoded) => void} callback The callback function to run once the token has been verified.
 * @throws {Error} If the token is invalid or authentication is denied.
 */
const verifyJWT = (token, secret, callback) => {
    jsonwebtoken.verify(token, secret, (error, decoded) =>
        callback(error, decoded)
    );
};

/**
 * Verify a refresh token.
 * @param {string} token The token to verify.
 * @param {(decoded) => void} callback The callback function to run once the token has been verified.
 * @throws {Error} If the refresh token is invalid
 */
const verifyRefreshToken = (token, callback) => {
    verifyJWT(token, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (error) throw new Error("Forbidden error");
        if (!decoded) throw new Error("Invalid credentials");
        callback(decoded);
    });
};

/**
 * Verify a jwt token.
 * @param {Request} req The request object.
 * @param {(decoded) => void} callback The callback function for the decoded token.
 * @param {number[] | null} permissions The permissions allowed for the request.
 * @throws {Error} If the jwt token is invalid or access is unauthorised.
 */
const verifyAccessToken = (req, callback, permissions = null) => {
    const authHeader = req.headers.authorisation || req.headers.Authorisation;
    if (!authHeader?.startsWith("Bearer ")) throw new Error("Unauthorised");
    const token = authHeader.split(" ")[1];

    verifyJWT(token, process.env.TOKEN_SECRET, (error, decoded) => {
        if (error) throw new Error("Invalid token");
        if (
            permissions &&
            !permissions.find((permission) =>
                decoded.permissions.includes(permission)
            )
        ) {
            throw new Error("Unauthorised access");
        }
        callback(decoded);
    });
};

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    verifyAccessToken,
};

const { Request } = require("express");

const { verifyJWT } = require("../api/jsonwebtoken");

/**
 * Verify a jwt token.
 * @param {Request} req The request object.
 * @param {(decoded) => void} callback The callback function for the decoded token.
 * @param {number[] | null} permissions The permissions allowed for the request.
 * @throws If the jwt token is invalid or access is unauthorised.
 */
const verifyAToken = (req, callback, permissions = null) => {
    const authHeader = req.headers.authorisation || req.headers.Authorisation;
    if (!authHeader?.startsWith("Bearer ")) throw new Error("Unauthorised");
    const token = authHeader.split(" ")[1];

    verifyJWT(token, process.env.TOKEN_SECRET, (error, decoded) => {
        console.log(error, decoded)
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

module.exports = verifyAToken;

const { Request, Response, NextFunction } = require("express");

const { verifyToken } = require("../api/jsonwebtoken");

/**
 * Verify a jwt token.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @param {NextFunction} next The next function.
 */
const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorisation || req.headers.Authorisation;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];

    verifyToken(token, process.env.TOKEN_SECRET, (error, decoded) => {
        if (error) return res.sendStatus(403); //invalid token
        req.email = decoded.email;
        req.permissions = decoded.permissions;
        next();
    });
};

module.exports = verifyAccessToken;

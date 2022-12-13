const jwt = require("jsonwebtoken");
const { Request, Response, NextFunction } = require("express");

/**
 * Verify a jwt token.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @param {NextFunction} next The next function.
 * @returns
 */
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorisation || req.headers.Authorisation;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
        req.email = decoded.email;
        req.permissions = decoded.permissions;
        next();
    });
};

module.exports = verifyJWT;

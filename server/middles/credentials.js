const allowedOrigins = require("../config/allowedOrigins");
const { Request, Response, NextFunction } = require("express");

/**
 * Validate credentials for a request.
 * @param {Request} req Request object.
 * @param {Response} res Response object.
 * @param {NextFunction} next Next callback.
 */
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
};

module.exports = credentials;

import { NextFunction, Request, Response } from "express";

import allowedOrigins from "../config/allowedOrigins.js";

/**
 * Validate credentials for a request.
 * @param req Request object.
 * @param res Response object.
 * @param next Next callback.
 */
export default (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin as string;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", JSON.stringify(true));
    }
    next();
};

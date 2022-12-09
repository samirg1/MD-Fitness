const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    //const token = req.cookies.jwt

    const authHeader = req.headers.authorisation || req.headers.Authorisation;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.email = decoded.email;
            req.permissions = decoded.permissions;
            next();
        }
    );
}

module.exports = verifyJWT;
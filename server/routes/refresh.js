const router = require("express").Router();
const User = require("../models/User");
const jsonwebtoken = require("jsonwebtoken");

router.get("/", async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).send("Cookie not found");
    const refreshToken = cookies.jwt;

    // evaluate jwt
    jsonwebtoken.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (!decoded) return res.status(403).send("Invalid credentials");
            const foundUser = await User.findOne({ email: decoded.email });
            if (err) return res.status(403).send("Forbidden error");
            if (!foundUser) return res.status(403).send("Forbidden user");

            const permissions = Object.values(foundUser.permissions);
            const accessToken = jsonwebtoken.sign(
                { email: decoded.email, permissions: permissions },
                process.env.TOKEN_SECRET,
                { expiresIn: "10s" }
            );
            res.json({ permissions, accessToken, name: foundUser.name });
        }
    );
});

module.exports = router;

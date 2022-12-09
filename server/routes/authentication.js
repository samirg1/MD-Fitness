const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/register", async (req, res) => {
    const validationError = User.validateRegister(req.body);
    if (validationError) return res.status(400).send(validationError.message);

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("email already exists");

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (savingError) {
        res.status(400).send(savingError);
    }
});

router.post("/login", async (req, res) => {
    const errorMessage = "invalid email and/or password";

    if (User.validateLogin(req.body)) return res.status(400).send(errorMessage);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(errorMessage);

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) return res.status(400).send(errorMessage);

    const accessToken = jsonwebtoken.sign(
        { email: user.email, permissions: user.permissions },
        process.env.TOKEN_SECRET,
        { expiresIn: "10s" }
    );
    const refreshToken = jsonwebtoken.sign(
        { email: user.email, permissions: user.permissions },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30s" }
    );

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.header("authentication-token", accessToken);

    res.send({
        name: user.name,
        email: user.email,
        accessToken: accessToken,
        permissions: user.permissions,
    });
});

module.exports = router;

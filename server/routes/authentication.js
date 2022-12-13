const router = require("express").Router();

const { hashPassword, comparePassword } = require("../api/bcrypt");
const { signToken, verifyToken } = require("../api/jsonwebtoken");
const confirmationRoute = require("./confirmationEmail");
const User = require("../models/User");

/**
 * Register a new user.
 */
router.post("/register", async (req, res) => {
    const validationError = User.validateRegister(req.body); // validate the registration
    if (validationError) return res.status(400).send(validationError.message);

    const emailExists = await User.findOne({ email: req.body.email }); // check if the email exists
    if (emailExists) return res.status(400).send("email already exists");

    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
    });

    // save user
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (savingError) {
        res.status(400).send(savingError);
    }
});

/**
 * Log a user in.
 */
router.post("/login", async (req, res) => {
    const errorMessage = "invalid email and/or password"; // default error message

    if (User.validateLogin(req.body)) return res.status(400).send(errorMessage); // validate login object

    const user = await User.findOne({ email: req.body.email }); // get user

    // ensure user exists and has been activated
    if (!user) return res.status(400).send(errorMessage);
    if (!user.activated)
        return res
            .status(400)
            .send(
                "Account has not been activated, please check your email for a confirmation"
            );

    // check password
    const validPassword = await comparePassword(
        req.body.password,
        user.password
    );
    if (!validPassword) return res.status(400).send(errorMessage);

    // get an access token
    const accessToken = signToken(
        { email: user.email, permissions: user.permissions },
        process.env.TOKEN_SECRET,
        { expiresIn: "10s" }
    );

    // get a refresh token
    const refreshToken = signToken(
        { email: user.email, permissions: user.permissions },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    // store refresh token in secure cookie
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.header("authentication-token", accessToken);

    // send details
    res.send({
        name: user.name,
        email: user.email,
        accessToken: accessToken,
        permissions: user.permissions,
    });
});

/**
 * Log a user out of the application.
 */
router.post("/logout", async (req, res) => {
    const cookies = req.cookies; // get the cookies
    if (!cookies?.jwt) return res.sendStatus(204);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // clear the cookie
    res.sendStatus(204);
});

/**
 * Confirm and activate a user's account.
 */
router.post("/confirmEmail/:token", async (req, res) => {
    const { token } = req.params; // get token param

    // verify token to get id
    let id;
    verifyToken(token, process.env.CONFIRMATION_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.status(400).send("Link is not valid");
        if (!decoded) return res.status(400).send("Link is not valid");
        id = decoded.id;
    });

    try {
        const user = await User.findOne({ _id: id }); // find the user
        if (!user) return res.status(400).send("Specified user not found");
        user.activated = true; // activate the user
        await user.save();
    } catch (error) {
        return res.status(400).send("Specified user not found");
    }
    res.sendStatus(204);
});

router.use("/confirmation", confirmationRoute); // for sending confirmation email

module.exports = router;

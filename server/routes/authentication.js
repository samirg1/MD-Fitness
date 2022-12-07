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

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send(errorMessage);

    const token = jsonwebtoken.sign({ name: user.name, email: user.email }, process.env.TOKEN_SECRET);
    res.header('authentication-token', token);

    res.send("Logged in as " + user.name);
});

module.exports = router;

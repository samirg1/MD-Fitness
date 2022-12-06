const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
    const validationError = User.registerValidate(req.body);
    if (validationError) return res.status(400).send(validationError.message);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (savingError) {
        res.status(400).send(savingError);
    }
});

module.exports = router;

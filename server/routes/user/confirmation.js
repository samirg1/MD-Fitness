const confirmationRouter = require("express").Router();

const { sendConfirmationEmail } = require("../../api/mailer");
const { verifyToken } = require("../../api/jsonwebtoken");
const User = require("../../models/User");

/**
 * Send confirmation email.
 */
confirmationRouter.post("/send", async (req, res) => {
    const error = await sendConfirmationEmail(req.body.email); // get error if there was one
    if (error) return res.status(400).send(error);
    res.sendStatus(200);
});

confirmationRouter.post("/confirm/:token", async (req, res) => {
    const { token } = req.params; // get token param

    // verify token to get id
    let id;
    verifyToken(token, process.env.CONFIRMATION_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.status(400).send("Link is not valid");
        if (!decoded) return res.status(400).send("Link is not valid");
        id = decoded.id;
    });

    try {
        console.log(id);
        const user = await User.findOne({ _id: id }); // find the user
        if (!user) return res.status(400).send("Specified user not found");
        user.activated = true; // activate the user
        await user.save();
    } catch (error) {
        return res.status(400).send("Specified user not found");
    }
    res.sendStatus(204);
});

module.exports = confirmationRouter;

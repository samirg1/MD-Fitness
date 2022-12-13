const router = require("express").Router();

const { sendConfirmationEmail } = require("../api/mailer");
const { signToken } = require("../api/jsonwebtoken");

/**
 * Send confirmation email.
 */
router.post("/", async (req, res) => {
    // create token
    const confirmationToken = signToken(
        { id: req.body.id },
        process.env.CONFIRMATION_TOKEN_SECRET,
        { expiresIn: "1h" }
    );
    const error = await sendConfirmationEmail(confirmationToken); // get error if there was one
    if (error) return res.status(400).send(error);
    res.sendStatus(200);
});

module.exports = router;

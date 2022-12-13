const { sendConfirmationEmail } = require("../api/mailer");
const router = require("express").Router();

/**
 * Send confirmation email.
 */
router.post("/", async (req, res) => {
    const error = await sendConfirmationEmail(req.body.id); // get error if there was one
    if (error) return res.status(400).send(error);
    res.sendStatus(200);
});

module.exports = router;

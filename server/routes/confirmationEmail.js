const { sendConfirmationEmail } = require("../mailer");
const router = require("express").Router();

router.post("/", async (req, res) => {
    const error = await sendConfirmationEmail(req.body.id);
    if (error) return res.status(400).send(error);
    res.sendStatus(200);
});

module.exports = router;

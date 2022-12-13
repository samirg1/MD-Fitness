const router = require("express").Router();

const User = require("../models/User");

/**
 * Get the currents users of the application from database.
 */
router.get("/", async (req, res) => {
    if (!req.permissions.includes(Number(process.env.ADMIN_PERMISSION)))
        return res.sendStatus(403);
    const users = await User.find({}, { password: false });
    if (!users) return res.status(204).json({ message: "No users found" });
    res.json(users);
});

module.exports = router;

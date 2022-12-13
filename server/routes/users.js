const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * Get the currents users of the application from database.
 */
router.get("/", async (req, res) => {
    const users = await User.find({}, {password: false});
    if (!users) return res.status(204).json({ message: "No users found" });
    res.json(users);
});

module.exports = router;

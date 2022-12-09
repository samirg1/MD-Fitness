const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
    // TODO: require admin permission
    const users = await User.find({}, {password: false});
    if (!users) return res.status(204).json({ message: "No users found" });
    res.json(users);
});

module.exports = router;

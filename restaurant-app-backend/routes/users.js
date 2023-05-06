const express = require("express");
const router = express.Router();
const User = require("../models/db/user");

router.get("/", async (req, res) => {
    const users = await User.find({});
    res.send(users);
})
router.get('/:id', async (req, res) => {
    const user = await User.findById({ _id: req.params.id });
    res.send(user);
});
router.post("/add-user", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin
    });
    const resp = await user.save();
    res.send(resp);
});

module.exports = router;
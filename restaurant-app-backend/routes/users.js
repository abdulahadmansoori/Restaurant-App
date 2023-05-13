const express = require("express");
const router = express.Router();
const User = require("../models/db/user");

router.get("/", async (req, res) => {
    const users = await User.find({});
    console.log(users);
    res.send(users);
})
router.get('/:id', async (req, res) => {
    const user = await User.findById({ _id: req.params.id });
    res.send(user);
});
// getUserAuth
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" })
    }
    if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    await User.findOneAndUpdate({ email: email }, { status: true });
    res.send({ message: 'Login successful', token: user._id });
    console.log(user);
});
// getAdminAuth
router.post('/signin/isAdmin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" })
    }
    if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (true !== user.isAdmin) {
        return res.status(401).json({ message: 'Invalid email or password or not an Admin' });
    }
    await User.findOneAndUpdate({ email: email }, { status: true });
    res.send({ message: 'Login successful', token: user._id });
    console.log(user);
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
    const checkUser = await User.findOne({ email: user.email });
    if (checkUser) {
        return res.status(401).json({ message: "User Already Register" });
    }
    const resp = await user.save();
    res.send(resp);
});
router.delete("/:id", async (req, res) => {
    const resp = await User.deleteOne({ _id: req.params.id });
    let message = "";
    if (resp.deletedCount > 0) {
        message = { success: true };
    } else {
        message = { success: false };
    }
    res.send(message);
    console.log(req.params.id, resp, message);
});
router.put("/:id", async (req, res) => {
    try {
        console.log(req.params.id+"===="+req.body)
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating User' });
    }
})
module.exports = router;
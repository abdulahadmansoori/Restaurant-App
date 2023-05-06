const express = require("express");
const router = express.Router();
const Order = require("../models/db/order");

router.get("/", async (req, res) => {
    const resp = await Order.find({});
    res.send(resp);
})
// router.post("/", async (req, res) => {
//     const Order = new Order({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         address: req.body.address,
//         phone: req.body.phone,
//         isAdmin: req.body.isAdmin
//     });
//     const resp = await Order.save();
//     res.send(resp);
// });

module.exports = router;
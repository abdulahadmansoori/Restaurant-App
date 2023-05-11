const express = require("express");
const router = express.Router();
const Order = require("../models/db/order");

router.get("/", async (req, res) => {
    const resp = await Order.find({});
    res.send(resp);
});
router.get('/:id', async (req, res) => {
  const resp = await Order.findOne({ _id: req.params.id });
  console.log(resp);
  res.send(resp);
});
router.post("/place-order", async (req, res) => {
  const order = new Order({
          user: req.body.user,
          orderName: req.body.orderName,
          address: req.body.address,
          products: req.body.products,
          total: req.body.total
        });
  const resp = await order.save();
  res.send(resp);
});
router.delete("/:id", async (req, res) => {
  const resp = await Order.deleteOne({ _id: req.params.id });
  let message = "";
  if (resp.deletedCount > 0) {
      message = { success: true };
  } else {
      message = { success: false };
  }
  res.send(message);
  console.log(req.params.id, resp, message);
});
module.exports = router;
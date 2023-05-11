const express = require("express");
const router = express.Router();
const Product = require("../models/db/product");

router.get("/", async (req, res) => {
    const resp = await Product.find({});
    res.send(resp);
})
router.get('/:id', async (req, res) => {
    const resp = await Product.findOne({ _id: req.params.id });
    console.log(resp);
    res.send(resp);
});
router.post("/add-product", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
    });
    const resp = await product.save();
    res.send(resp);
});
router.delete("/:id", async (req, res) => {
    const resp = await Product.deleteOne({ _id: req.params.id });
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
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedProduct);
        // console.log(updatedProduct, req.body);
        // res.status(500).send({ message: 'updating Product' })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating Product' });
    }
})

module.exports = router;
const express = require("express");
const router = express.Router();
const Product = require("../models/db/product");

router.get("/", async (req, res) => {
    const resp = await Product.find({});
    res.send(resp); 
})
router.get('/:id', async (req, res) => {
    const resp = await Product.findOne({ _id: req.params.id });
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
    const resp = await Product.deleteOne({ _id: req.params.id});
    let message ="";
    if(resp.deletedCount>0){
        message ={ success: true };
    } else{
       message =  { success: false };
    }
    // res.send(resp.deletedCount > 0 ? { success: true } : { success: false });
    res.send(message);
    console.log(req.params.id, resp, message);
});

module.exports = router;
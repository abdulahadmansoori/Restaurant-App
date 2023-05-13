const express = require('express');
const router = express.Router();
const Product = require('../models/db/product');
const User = require('../models/db/user');
const Order = require('../models/db/order');

router.get('/counts', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const avaliableProductCount = await Product.countDocuments({ status: 'Avaliable' });
    const userCount = await User.countDocuments();
    const activeUserCount = await User.countDocuments({ status: 'true' });
    const pendingOrderCount = await Order.countDocuments({ status: 'Pending' });
    const processingOrderCount = await Order.countDocuments({ status: 'Processing' });

    const counts={
      productCount,
      avaliableProductCount,
      userCount,
      activeUserCount,
      pendingOrderCount,
      processingOrderCount
    }
    res.send(counts);
    console.log(counts);
}
   catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
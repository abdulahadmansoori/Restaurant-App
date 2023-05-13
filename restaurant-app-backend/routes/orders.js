const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const Order = require("../models/db/order");
// router.get("/", async (req, res) => {
//     const resp = await Order.find({});
//     res.send(resp);
// });
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const orders = await Order.aggregate([
    { $match: 
      { user: mongoose.Types.ObjectId.createFromHexString(userId), 
        // status: status
      } 
    },
    { $lookup: {
      from: 'products',
      localField: 'products.product',
      foreignField: '_id',
      as: 'productDetails'
    }},
    { $unwind: '$productDetails' },
    { $group: {
      _id: '$_id',
      user: { $first: '$user' },
      products: { $first: '$products' },
      total: { $first: '$total' },
      orderName: { $first: '$orderName' },
      address: { $first: '$address' },
      status: { $first: '$status' },
      createdAt: { $first: '$createdAt' },
      updatedAt: { $first: '$updatedAt' },
      productDetails: {
        $push: {
          _id: '$productDetails._id',
          name: '$productDetails.name',
          description: '$productDetails.description',
          price: '$productDetails.price',
          image: '$productDetails.image',
          quantity: {
            $arrayElemAt: [
              '$products.quantity',
              { $indexOfArray: ['$products.product', '$productDetails._id'] }
            ]
          }
        }
      }
    }},
    { $project: {
      user: 1,
      products: 1,
      total: 1,
      orderName: 1,
      address: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
      productDetails: 1
    }}
  ]);

  res.send(orders);
});
router.get('/:status', async (req, res) => {
  const status  = req.params.status;
  
  try {
    console.log(status);
    const orders = await Order.aggregate([
      {
        $match: { status: status }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $project: {
          _id: 1,
          user: 1,
          orderName: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          total: 1,
          address: 1,
          'userDetails._id': 1,
          'userDetails.name': 1,
          'userDetails.email': 1,
          'userDetails.phone': 1,
          'productDetails.name': 1,
          'productDetails.price': 1,
          'productDetails.description': 1,
          'productDetails.image': 1,
          'products.quantity': 1
        }
      }
    ]);

    res.send(orders);
    console.log(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//   res.send(orders);
// });
// router.get('/:id', async (req, res) => {
//   const resp = await Order.findOne({ _id: req.params.id });
//   console.log(resp);
//   res.send(resp);
// });
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
router.put("/:id", async (req, res) => {
  try {
      console.log(req.params.id+"===="+req.body)
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
      // res.send(updatedOrder);
      // console.log(updatedProduct, req.body);
      res.status(500).send({ message: 'Order Canceled!' })
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error Cancelling Order!' });
  }
})
module.exports = router;
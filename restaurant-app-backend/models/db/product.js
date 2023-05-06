const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true,
    trim: true
  }
  // restaurant: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Restaurant',
  //   required: true
  // }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
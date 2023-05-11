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
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Avaliable', 'NotAvaliable'],
    default: "Avaliable",
  }
  // restaurant: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Restaurant',
  //   required: true
  // }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
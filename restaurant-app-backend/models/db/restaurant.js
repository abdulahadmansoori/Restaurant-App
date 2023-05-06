const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
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
    address: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }]
  });

  const Restaurant = mongoose.model('Restaurant', restaurantSchema);
  module.exports = Restaurant;
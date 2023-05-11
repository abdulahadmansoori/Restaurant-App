const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: false,
      trim: true
    },
    phone: {
      type: String,
      required: false,
      trim: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    createdOn: {
      type: Date,
      default: Date.now
    },
    status: {
      type: Boolean,
      default: false
    }
  });

  const User = mongoose.model('User', userSchema);
  module.exports = User;
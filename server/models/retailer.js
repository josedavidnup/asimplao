const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const retailerSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: 'retailer',
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    // wishlist: [{type:ObjectId, ref: 'Product'}],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Retailer', retailerSchema);

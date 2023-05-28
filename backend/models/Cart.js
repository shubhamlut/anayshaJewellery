const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
  },

  orderStatus: {
    type: String,
    default: "In Cart",
  },
  date: {
    type: Date,
    default: Date.now,
  },

  orderAmount: {
    type: Number,
    required: true,
  },

  orderName: {
    type: String,
    required: true,
  },

  // orderImage: {
  //   data: Buffer,
  //   contentType: String,
  // },
});

module.exports = mongoose.model("cart", cartSchema);

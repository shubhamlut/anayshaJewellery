const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  orderName: {
    type: String,
    required: true,
  },

  orderDescription: {
    type: String,
    required: true,
  },

  orderStatus: {
    type: String,
    default: "placed",
  },
  date: {
    type: Date,
    default: Date.now,
  },

  orderAmount: {
    type: Number,
    required: true,
  },

  shippingAddress: {
    type: String,
    required: true,
  },
});

module.exports =  mongoose.model('orders',ordersSchema)

const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },

  productDescription: {
    type: String,
    required: true,
  },

  productPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  productCategory: {
    type: String,
    required: true,
  },

  productImage: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("product", productSchema);

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

  productImage:{
    type:String,
    required:true
  },
});

module.exports =  mongoose.model('product',productSchema)

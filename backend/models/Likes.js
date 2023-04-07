const mongoose = require("mongoose");
const { Schema } = mongoose;

const likesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  order:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
  },


  
});

module.exports =  mongoose.model('likes',likesSchema)

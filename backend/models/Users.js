//This is used to craete Schema

const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({

    name:{
        type:String,
        required: true
    },

    email:{
        type:String,
        required: true,
        unique:true
    },

    password:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    shippingAddress:{
        type:String,
        default:"To Be Decided"
    }
})


module.exports =  mongoose.model('user',userSchema)
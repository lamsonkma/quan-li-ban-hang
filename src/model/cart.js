const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = new Schema({
    id_session:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'products',
        quantity:Number
    },
    quantity:Number
    
},{timestamps:true,});
module.exports= mongoose.model('cart', cart);

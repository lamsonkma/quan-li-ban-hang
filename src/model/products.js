const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./categorys');
require('./producers');
const product = new Schema({
    name: String,
    producer:{
        type:  mongoose.Schema.Types.ObjectId, ref: 'producers'
    },
    category:{
        type:  mongoose.Schema.Types.ObjectId, ref: 'categorys'
    },
    image:Array,
    description:String,
    price:String,
})
module.exports = mongoose.model('products', product);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
  category: String,
  producer: String,
  name: String,
  description: String,
  image:Array,
  price:Number,
},{timestamps:true,});
module.exports= mongoose.model('products', product);

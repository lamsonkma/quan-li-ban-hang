const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./carts');
const user = new Schema({
    username: String,
    password: String,
    phone: String,
    address:Array,
    refreshToken:String,
},
    { timestamps: true, }
)
module.exports = mongoose.model('users', user);
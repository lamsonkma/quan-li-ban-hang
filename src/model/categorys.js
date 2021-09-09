const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({
    name:String
})
module.exports = mongoose.model('categorys', category);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const producer = new Schema({
    name: String,
})
module.exports = mongoose.model('producers', producer);
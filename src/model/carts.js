const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    product: Array,
},
    { timestamps: true, }
)
module.exports = mongoose.model('carts', cart);
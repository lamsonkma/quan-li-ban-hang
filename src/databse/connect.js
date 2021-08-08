const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/qlbh_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("kết nối db thành công");
    } catch (error) {
        console.log("kết nối db thất bại");
    }
}
module.exports = { connect };
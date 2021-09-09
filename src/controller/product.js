const db = require("../databse/connect");
const modelProduct = require("../model/products");
const modelCategory = require("../model/categorys");
class product {
    index(req, res, next) {
        modelProduct.find({}).lean().then(data => {
            let listSmartPhone = [], listLapTop = [], listAccessories = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].category === 'phone') {
                    listSmartPhone.push(data[i]);
                }
                else if (data[i].category === 'laptop') {
                    listLapTop.push(data[i]);
                }
                else {
                    listAccessories.push(data[i]);
                }
            }
            res.render('home', { listSmartPhone, listLapTop, listAccessories })
        })
            .catch(next)
    }
    // findId(req, res) {
    //     const id = req.params.id;
    //     modelProduct.find({ _id: id })
    //         .then(data => {
    //             res.status(200).send(data);
    //         })
    //         .catch(err => console.log(err));
    // }
    showCategory(req, res) {
        const category = req.query.category;
        const id = req.query.id;
        if (req.query.hasOwnProperty('sort')) {
            if (req.query.type === "asc") {
                modelCategory.find({ name: category })
                    .then(data => {
                        if(data.length !== 0 ){
                            modelProduct.find({ category: data[0]._id }).sort({ 'price': 1 }).populate('category').lean().then(result => {
                                res.render('product', { result });
                                return;
                            })
                        }
                        else{
                            modelCategory.find({ name: category })
                            .then(data => {
                                modelProduct.find({ category: data[0]._id }).populate('category').lean().then(result => {
                                    res.render('product', { result });
                                    return;
                                })
                            })
                        }
                    })
            } else {
                modelCategory.find({ name: category })
                    .then(data => {
                        modelProduct.find({ category: data[0]._id }).sort({ 'price': -1 }).populate('category').lean().then(result => {
                            res.render('product', { result });
                            return;
                        })
                    })
            }

        }
        else if (id) {
            modelProduct.find({ _id: id }).populate('producer').populate('category').lean()
                .then(data => {
                    data.forEach(e => {
                        modelProduct.find({ producer: e.producer._id }).lean().then(offer => {
                            res.render('product-detail', { data, offer });
                            return;
                        })
                    });
                })
        }
        else {
            modelCategory.find({ name: category })
                .then(data => {
                    modelProduct.find({ category: data[0]._id }).populate('category').lean().then(result => {
                        res.render('product', { result });
                        return;
                    })
                })
        }
    }

}
module.exports = new product;
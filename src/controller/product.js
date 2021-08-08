const db = require("../databse/connect");
const modelProduct = require("../model/product");
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
    findId(req,res){
        const id = req.params.id;
        modelProduct.find({ _id:id})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => console.log(err));
    }
    showCategory(req,res){
        const category = req.query.category;
        const id = req.query.id;
        if(id){
            modelProduct.find({ _id:id}).lean()
            .then(data => {
                data.forEach(e => {
                    modelProduct.find({ category: e.category }).lean().then(offer => {
                        res.render('product-detail', {data,offer});
                    })
                });
            })
            .catch(()=>res.redirect('/'));
        }
        else{
            modelProduct.find({ category: category }).lean()
            .then(data => {
                res.render('product', {data });
            })
            .catch(()=>res.redirect('/'));
        }
    }

}
module.exports = new product;
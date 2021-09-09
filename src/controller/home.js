const modelProduct = require('../model/products');
const db = require("../databse/connect");
const page_size = 2;
class home {
    home(req, res, next) {
        modelProduct.find({}).lean().populate('category').then(data => {
            let listSmartPhone = [], listLapTop = [], listAccessories = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].category.name === 'phone') {
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
    create(req, res, next) {

        res.render("create");
    }

    async new(req, res, next) {
        try {
            let formData = req.body;
            formData.image = await req.body.image.split(',');
            console.log(formData);
            const product = new modelProduct(formData);
            // product.save();
            res.redirect('create');
        } catch (error) {

        }
    }
    search(req, res) {
        try {
            let arr = [];
            let keySearch = req.body.str.toLowerCase();
            if (keySearch.length > 0) {
                modelProduct.find({}).populate('category').lean().then(results => {
                    results.forEach(result => {
                        if (result.name.toLowerCase().indexOf(keySearch) !== -1) {
                            arr.push(result);
                        }
                    })
                }).then(() => {
                    res.status(200).json(arr);
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    // product/pagination
    pagination(req, res) {
        let page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
        let start = (page - 1) * page_size;
        modelProduct.find({}).lean().skip(start).limit(page_size).then(data => {
            modelProduct.countDocuments({}).then(total=>{
                const totalPage = Math.ceil(total/page_size);
                res.json({totalPage:totalPage,data});
            })
        })
    }
}
module.exports = new home;
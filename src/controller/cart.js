const modelProduct = require('../model/product');
const modelCart = require('../model/cart');
class cart {
    cart(req, res) {
        if (req.session.cart) {
            let listIdProduct = [];
            let listCart = req.session.cart;
            for (let i = 0; i < listCart.length; i++) {
                listIdProduct.push(listCart[i].product)
            }
            let itemId = listIdProduct.map(function (id) { return id; });
            modelProduct.find({ _id: { $in: itemId } }).lean()
                .then(data => {
                    res.render('cart',{data,listCart});
                })
        }
        else {
            res.render("cart");
        }
    }
    deleteItemCart(req,res){
        let id = req.params.id;
        if(req.session.cart){
            req.session.cart = req.session.cart.filter(item => item.product!==id);
            req.session.save();
        }
        res.status(200).json('ok');
    }
    addToCart(req, res) {
        try {
            let itemCart = req.body.result;
            let listCart = req.session.cart || [];
            let check = false;
    
            for (let i = 0; i < listCart.length; i++) {
                if (listCart[i].product === itemCart) {
                    check = true;
                }
                else {
                    check = false;
                }
            }
            if (check === false) {
                listCart.push({ product: itemCart, quantity: 1 });
                req.session.cart = listCart;
                req.session.save();
            }
            else {
                listCart.forEach(item => {
                    if (item.product === itemCart) {
                        item.quantity++;
                        req.session.cart = listCart;
                        req.session.save();
                    }
                })
            }
            res.status(200).json({task:'Thêm giỏ hàng thành công',number:req.session.cart.length})
        } catch (error) {
            res.status(400);
        }
        
    }
    numberCart(req,res){
        try {
            res.status(200).json({task:'Thêm giỏ hàng thành công',number:req.session.cart.length});
        } catch (error) {
            res.status(200).json({task:'Thêm giỏ hàng thành công',number:0})
        }
    }
}
module.exports = new cart;
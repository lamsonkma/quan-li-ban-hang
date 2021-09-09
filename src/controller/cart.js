const modelProduct = require('../model/products');
const modelCart = require('../model/carts');
const mongoose = require('mongoose');
class cart {
    cart(req, res) {
        if (req.session.cart) {
            let listIdProduct = [];
            let listCart = req.session.cart;
            let listOrder = [];
            for (let i = 0; i < listCart.length; i++) {
                listIdProduct.push(listCart[i].id)
            }
            let itemId = listIdProduct.map(function (id) { return id; });
            modelProduct.find({ _id: { $in: itemId } }).lean()
                .then(data => {
                    res.render('cart', { data, listCart });
                })
        }
        else {
            res.render("cart");
        }
    }
    deleteItemCart(req, res) {
        let id = req.params.id;
        if (req.session.cart) {
            req.session.cart = req.session.cart.filter(item => item.id !== id);
            req.session.save();
        }
        res.status(200).json('ok');
    }
    addToCart(req, res) {
        try {
            let itemCart = req.body.result;
            let listCart = req.session.cart || [];
            let check = listCart.filter(item => item.id === itemCart);
            if (check.length === 0) {
                listCart.push({ id: itemCart, quantity: 1 });
                req.session.cart = listCart;
                req.session.save();
            }
            else {
                listCart.forEach(item => {
                    if (item.id === itemCart) {
                        item.quantity++;
                        req.session.cart = listCart;
                        req.session.save();
                    }
                })
            }
            res.status(200).json({ task: 'Thêm giỏ hàng thành công', number: req.session.cart.length, cart: req.session.cart })
        } catch (error) {
            res.status(400);
        }

    }
    orderCart(req, res) {
        let user_id = req.userId;
        let listOrder = req.body.listOrder;
        if (listOrder.length === 0) {
            return res.json({task:"please select item"})
        }
        let listCart = req.session.cart.filter(item => listOrder.some(id => item.id === id));
        let formData = { user: mongoose.Types.ObjectId(user_id), product: listCart };
        let order = new modelCart(formData);
        order.save();
        let cartRemaining = req.session.cart.filter(item => !listOrder.includes(item.id));
        req.session.cart = cartRemaining;
        req.session.save();
        // modelCart.find({ user: user_id }).then(data => {
        //     if (data.length === 0) {

        //     }
        //     else {
        //         modelCart.update(
        //             { user: mongoose.Types.ObjectId(user_id) },
        //             {
        //                 $push: {
        //                     product: { $each: listCart }
        //                 }
        //             }
        //         )
        //     }
        // })
        res.json({task:'save order success'});
    }
    // editCart(res,res){

    // }
    numberCart(req, res) {
        try {
            res.status(200).json({ task: 'Thêm giỏ hàng thành công', number: req.session.cart.length });
        } catch (error) {
            res.status(200).json({ task: 'Thêm giỏ hàng thành công', number: 0 })
        }
    }
}
module.exports = new cart;
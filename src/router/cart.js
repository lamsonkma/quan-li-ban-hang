const express = require('express');
const router = express.Router();
const controller = require('../controller/cart'); 

router.post('/addToCart',controller.addToCart);
router.get('/',controller.cart);
router.delete('/delete/:id',controller.deleteItemCart);
router.get('/number',controller.numberCart);
router.post('/order',controller.orderCart);
module.exports = router;
// routerCheckPoint.checkPoint,
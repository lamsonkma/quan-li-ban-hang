const express = require('express');
const router = express.Router();
const controller = require('../controller/cart'); 
const routerCheckPoint = require("../middleware/checkPoint");
router.post('/addToCart',routerCheckPoint.checkPoint,controller.addToCart);
router.get('/',routerCheckPoint.checkPoint,controller.cart);
router.delete('/delete/:id',controller.deleteItemCart);
router.get('/number',controller.numberCart);
module.exports = router;
// routerCheckPoint.checkPoint,
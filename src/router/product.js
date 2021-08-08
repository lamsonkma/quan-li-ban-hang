const express = require('express');
const router = express.Router();
const controller = require('../controller/product');

router.get('/',controller.showCategory);
router.get('/:id',controller.findId);
module.exports = router;
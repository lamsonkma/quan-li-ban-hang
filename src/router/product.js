const express = require('express');
const router = express.Router();
const controller = require('../controller/product');
router.get('/',controller.showCategory);
module.exports = router;
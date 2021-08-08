const express = require('express');
const router = express.Router();
const controller = require('../controller/home'); 
router.get('/',controller.home);
router.get('/create',controller.create);
router.post('/new',controller.new);
router.post('/search',controller.search);
router.get('/pagination',controller.pagination);
module.exports = router;

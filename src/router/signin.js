const express = require('express');
const router = express.Router();
const controller = require('../controller/user');
router.get('/',controller.signin);
router.post('/',controller.postSignin);
router.post('/auth',controller.googleAuth);
module.exports = router;
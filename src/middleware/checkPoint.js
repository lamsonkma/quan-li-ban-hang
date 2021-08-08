
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.checkPoint = ((req, res, next) => {
    try {
        const token = req.cookies.token;
        const result = jwt.verify(token,process.env.TOKEN_SECRECT);
        if(result){ 
            next();
        }
    }
    catch (err){
        res.render('signin');
    }
})
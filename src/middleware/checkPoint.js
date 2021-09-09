
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.checkPoint = ((req, res, next) => {
    // const token = req.cookies.token;
    // const authToken = req.headers["authorization"];
    // console.log(authToken);
    // jwt.verify(token, process.env.TOKEN_SECRECT, (err, data) => {
    //     if (err === null) {
    //         next();
    //     }
    //     else {
    //         res.render('signin');
    //     }
    // });
    const token = req.session.token || null;
    if(token === null){
        return res.render('signin');
    }
    jwt.verify(token, process.env.TOKEN_SECRECT, (err, data) => {
        if(err){
            return res.render('signin');
        }
        req.userId = data.id;
        next();
    })
})
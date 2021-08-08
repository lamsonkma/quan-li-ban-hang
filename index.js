const express = require('express');
const port = 3000;
require('dotenv').config();
const path = require('path');
const handlebars = require("express-handlebars");
const bodyPaser = require('body-parser');
const session = require('express-session')
const cookieParser = require('cookie-parser');
// 
const routerIndex = require("./src/router/index");
const routerProduct = require("./src/router/product");
const routerCart = require("./src/router/cart");
const routerSignin = require("./src/router/signin");
const routerSignup = require("./src/router/signup");
const routerUser = require("./src/router/user");
// end router
// 
const app = express();
const db = require('./src/databse/connect');


// 
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.TOKEN_SECRECT,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge:  1 * 24 * 60 * 60 * 1000,
    },
}))
// 

// app.get('/set_session', (req, res) => {
//     req.session.User = {
//         website: 'anonystick.com',
//         type: 'blog javascript',
//         like: '4550'
//     }

//     return res.status(200).json({status: 'success'})
// })

// app.get('/get_session', (req, res) => {
//     if(req.session.User){
//         return res.status(200).json({status: 'success', session: req.session.User})
//     }
//     return res.status(200).json({status: 'error', session: 'No session'})
// })

// app.get('/destroy_session', (req, res) => {
//     req.session.destroy(function(err) {
//         return res.status(200).json({status: 'success', session: 'cannot access session here'})
//     })
// })
// 
app.use(express.static(path.join(__dirname, 'src')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// 
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));
// 
app.use('/', routerIndex);
app.use('/product', routerProduct);
app.use('/cart',routerCart);
app.use('/signin', routerSignin);
app.use('/signup', routerSignup);
app.use('/user', routerUser);
db.connect();
app.listen(port, () => {
    console.log('Sever listenting port:' + port);
});
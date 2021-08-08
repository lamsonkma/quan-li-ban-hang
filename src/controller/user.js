const modelUser = require("../model/user");
const jwt = require('jsonwebtoken');
require('dotenv').config();
class user {
    user(req, res) {
        let check = false;
        try {
            let userName = req.body.userName;
            if (userName.length > 0) {
                modelUser.find({ username: userName }).lean().then(result => {
                    if (result.length > 0) {
                        check = true;
                    }
                }).then(() => res.send(check))
            }
        } catch (error) {
            console.log(error);
        }
    }
    signup(req, res) {
        res.render("signup");
    }
    signin(req, res) {
        req.session.destroy(()=>{
            res.render('signin');
        });
        
    }
    postSignin(req, res ,next) {
        let username = req.body.userName;
        let password = req.body.password;
        let err =[];
        modelUser.find({ username: username }).then(data => {
            if (data.length > 0) {
                data.forEach(user => {
                    if (user.password !== password) {
                        err.push({password:'Sai mật khẩu'});
                    }
                    else {
                        let token = jwt.sign({id:user._id},process.env.TOKEN_SECRECT,{expiresIn:180000});
                        res.cookie('token',token,{ expires: new Date(Date.now() + 180000)});
                        res.redirect('/');
                    }
                })
            }
            else {
                err.push({userName:'Sai tài khoản'});
            }

        }).then(()=>{
            if(err.length > 0 ){
                res.render('signin',{err});
            }
        });
    }
}
module.exports = new user;
const modelUser = require("../model/users");
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.ID_CLIENT);
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
        req.session.destroy(() => {
            res.render('signin');
        });

    }
    postSignin(req, res, next) {
        let username = req.body.userName;
        let password = req.body.password;
        let err = [];
        modelUser.find({ username: username }).then(data => {
            if (data.length > 0) {
                data.forEach(user => {
                    if (user.password !== password) {
                        err.push({ password: 'Sai mật khẩu' });
                    }
                    else {
                        let accessToken = jwt.sign({ id: user._id }, process.env.TOKEN_SECRECT, { expiresIn: '1d' });
                        let refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRECT, { expiresIn: '7d' });
                        modelUser.findByIdAndUpdate({ _id: user._id }, { "refreshToken": refreshToken });
                        req.session.token = accessToken;
                        res.redirect('/');
                    }
                })
            }
            else {
                err.push({ userName: 'Sai tài khoản' });
            }

        }).then(() => {
            if (err.length > 0) {
                res.render('signin', { err });
            }
        });
    }
    googleAuth(req, res) {
        let id_token = req.body.id_token;
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.ID_CLIENT,
            });
            const payload = ticket.getPayload();
            return payload;
        }
        verify()
            .then((payload) => {
                res.redirect('/');
                // modelUser.find({email:payload.email}).then(data=>{
                //     if(data.length !== 0){
                        
                //     }
                // })
            })
            .catch(err => console.log(err));
    }
}
module.exports = new user;
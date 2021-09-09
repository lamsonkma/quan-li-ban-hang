const express = require('express');
const port = 4000;
require('dotenv').config();
const db = require('./src/databse/connect');
const app = express();
const routerCheckPoint = require("./src/middleware/checkPoint");
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const jwt = require('jsonwebtoken');
const modelUser = require("./src/model/users");


app.post('/token',(req,res)=>{
    const refreshToken = req.body.refreshToken;
    modelUser.find({refreshToken:refreshToken}).then(data=>{
        if(data.length !== 0){
            const accessToken = jwt.sign({id:data[0]._id},process.env.TOKEN_SECRECT,{expiresIn:'1d'});
            res.send(accessToken);
        }
    })
})

app.get('/cart',routerCheckPoint.checkPoint,(req,res)=>{
    res.send(req.userId);
});
db.connect();
app.listen(port, () => {
    console.log('Sever listenting port:' + port);
});
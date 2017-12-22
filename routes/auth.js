const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const models = require('../models');
const config = require ('../config/config')
const bCrypt = require ('bcrypt')

router.post('/register/', (req, res) => {
    const {name, password} = req.body;
    models.User
        .create({name, password})
        .then(user => {
            const userid = user.id;
            res.json({ // return the information including token as JSON
                token: jwt.sign({userid}, config.secret, { // create a token
                    expiresIn: "1h" // expires in 24 hours
                }),
                name:user.name
            });
        })
        .catch(err => {
            console.log(err.message);
            if (err.message === "Validation error"){
                res.sendStatus(409);
            }
        });
});
router.post('/login/', (req, res) => {
    console.log(req.body);
    models.User
        .findOne({where: {name: req.body.name}})
        .then((user)=>{
            bCrypt.compare(req.body.password,user.password,(err,result)=>{
                const userid = user.id;
                if (err) console.log(err);
                if (result) {
                    res.json({ // return the information including token as JSON
                        token: jwt.sign({userid}, config.secret, { // create a token
                            expiresIn: "1h" // expires in 24 hours
                        }),
                        name: user.name,
                        id: user.id
                    });

                }else{
                    res.sendStatus(401);
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).send('User not found.')});
});
router.post('/check/',(req,res)=>{
    jwt.verify(req.body.token,config.secret,(err,decoded)=>{
        if (err) {
            res.sendStatus(498);
        }else{
            const userid = decoded.userid;
            console.log(decoded);
            models.User
                .findOne({where: {id: userid}})
                .then(user => res.json({
                    token: jwt.sign({userid}, config.secret, { // create a token
                        expiresIn: "1h" // expires in 24 hours
                    }),
                    name:user.name,
                    id: user.id
                }))
                .catch(err => res.status(404));
        }
    })
});

module.exports = router;

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
                })
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
                        })
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

module.exports = router;

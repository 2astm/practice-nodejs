const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const models = require('../models');
const config = require ('../config/config')
const bCrypt = require('bcrypt');

router.post('/', (req, res) => {
    const {name,password,age,occupation} = req.body;

    jwt.verify(req.body.token,config.secret,(err,decoded)=>{
        if (err) {
            res.sendStatus(498);
        }
        else {
            if (password != '') {
                models.User
                    .update({name, password, age, occupation}, {where: {id: decoded.userid}})
                    .then((user) => {
                        const userid = user.id;
                        res.json({ // return the information including token as JSON
                            token: jwt.sign({userid}, config.secret, { // create a token
                                expiresIn: "1h" // expires in 24 hours
                            })
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.sendStatus(409);
                    });
            }else{
                models.User
                    .update({name, age, occupation}, {where: {id: decoded.userid}})
                    .then((user) => {
                        const userid = user.id;
                        res.json({ // return the information including token as JSON
                            token: jwt.sign({userid}, config.secret, { // create a token
                                expiresIn: "1h" // expires in 24 hours
                            })
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.sendStatus(409);
                    });
            }
        }
    });

});

module.exports = router;

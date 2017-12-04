const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const models = require('../models');
const app = require('../app');

router.post('/', (req, res) => {
    const {name, password} = req.body;
    models.User
        .create({name, password})
        .then(user => {
            const name = user.name;
            res.json({ // return the information including token as JSON
                token: jwt.sign({name}, app.get('superSecret'), { // create a token
                    expiresIn: "24h" // expires in 24 hours
                })
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;

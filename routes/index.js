const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    models.User
        .findAll()
        .then((users = []) => res.json(users))
        .catch(err => console.log(err));
});

module.exports = router;

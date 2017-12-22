const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    models.User
        .findOne({where: {id: req.params.id}})
        .then(user => res.json(user))
        .catch(err => res.status(404).send('User not found.'));
});

module.exports = router;

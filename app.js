const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require("./config/config");

app.set('superSecret', config.secret);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    // allow CORS requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

    next();
});

app.use('/api/v1', routes);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: (app.get('env') === 'development') ? err : {} // if it is prod env there is no need to show error to user
    });
});

module.exports = app;

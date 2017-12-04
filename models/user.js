'use strict';
const bCrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const saltRounds = 10;

    const classMethods = {
        associate: models => {
            models.User.hasMany(models.Location);
        }
    };

    const instanceMethods = {
        checkPassword: (passwordToCheck, cb) => {
            bCrypt.compare(passwordToCheck, this.password, (err, isMatch) => {
                if (err) return cb(err);
                cb(null, isMatch);
            });
        }
    };

    const model = {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.INTEGER,
        occupation: DataTypes.STRING
    };

    const User = sequelize.define('User', model, {classMethods, instanceMethods});

    User.beforeCreate((user) => {
        return bCrypt.hash(user.password, saltRounds).then(hash => user.password = hash);
    });

    return User;
};

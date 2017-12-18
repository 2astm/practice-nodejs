'use strict';
module.exports = (sequelize, DataTypes) => {
    const classMethods = {
        associate: models => {
            models.Location.belongsTo(models.User, {
                onDelete: "CASCADE",
                foreignKey: {
                    allowNull: false
                }
            });
        }
    };

    const model = {
        name: DataTypes.STRING,
        lat: DataTypes.INTEGER,
        lng: DataTypes.INTEGER
    };

    return sequelize.define('Location', model, {classMethods});
};

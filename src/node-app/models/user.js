'use strict';
const {
    Model
} = require('sequelize');
const { user } = require('../config_backup/db');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsToMany(models.group, { through: "memberships" })
        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'user',
    });
    return User;
}

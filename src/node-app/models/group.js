'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.user, { as: 'members' })
            this.hasMany(models.event, { sourceKey: 'id', foreignKey: 'groupId', as: 'events' })
        }
    }
    Group.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        code: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'group',
    });
    return Group;
}

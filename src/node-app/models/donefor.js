'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DoneFor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            DoneFor.hasOne(models.user, { foreignKey: "id", sourceKey: "userId" })
        }
    }
    DoneFor.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        part: {
            type: DataTypes.DOUBLE
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'done_for',
        freezeTableName: true,
    });
    return DoneFor;
}

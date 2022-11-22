'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      event.belongsTo(models.group, { as: 'group' })
      event.hasMany(models.done_by)
      event.hasMany(models.done_for)
    }
  }
  event.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sum: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    distance: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};
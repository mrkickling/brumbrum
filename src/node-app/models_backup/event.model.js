const { _, DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sum: {
            type: DataTypes.DOUBLE
        },
        distance: {
            type: DataTypes.DOUBLE
        },
        description: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },

    });
}

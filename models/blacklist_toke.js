const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const todo =  sequelize.define('blacklist_token', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
              notNull: true
            }
        },
        token: {
            allowNull: false,
            type: DataTypes.STRING
        },
        ip: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });

    return todo;
};
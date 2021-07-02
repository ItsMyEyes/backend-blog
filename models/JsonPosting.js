const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const todo =  sequelize.define('json_postings', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
              notNull: true
            }
        },
        id_posting: {
            allowNull: false,
            type: DataTypes.STRING
        },
        encodeJSON: {
            allowNull: false,
            type: DataTypes.TEXT
        },
    });

    return todo;
};
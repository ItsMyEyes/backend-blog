const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const todo =  sequelize.define('follows', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
              notNull: true
            }
        },
        date: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });

    todo.associate = models => {
        todo.belongsTo(models.users, { as: 'following', foreignKey: 'who_follow'})
        todo.belongsTo(models.users, { as: 'follow', foreignKey: 'id_follow'})
    }

    return todo;
};
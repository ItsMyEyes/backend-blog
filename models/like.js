const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const todo =  sequelize.define('like', {
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
        },
    });

    todo.associate = models => {
        todo.belongsTo(models.posts, { as: 'likePost', foreignKey: 'id_posts'})
        todo.belongsTo(models.users, { as: 'userLike', foreignKey: 'id_users'})
    }

    return todo;
};
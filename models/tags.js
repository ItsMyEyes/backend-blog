const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const todo =  sequelize.define('tags', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
              notNull: true
            }
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
    });

    todo.associate = models => {
        todo.belongsTo(models.tags, { as: 'tagPosts', foreignKey: 'id_posts'})
    }

    return todo;
};
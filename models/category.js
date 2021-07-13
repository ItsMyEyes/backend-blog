const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const todo =  sequelize.define('categorys', {
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
        url_perma: {
            allowNull: false,
            type: DataTypes.STRING
        },
    });

    todo.associate = models => {
        todo.belongsToMany(models.posts, { as: "categoryPost", through: 'categoryPosts' })
        todo.belongsToMany(models.users, { as: "ownerCategory", through: 'ownerCategorys' })
    }

    return todo;
};
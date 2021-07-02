const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const todo =  sequelize.define('posts', {
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
        description: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        thumbail_url: {
            allowNull: false,
            type: DataTypes.STRING
        },
        date_created: {
            allowNull: false,
            type: DataTypes.STRING
        },
        date_updated: {
            allowNull: false,
            type: DataTypes.STRING
        },
        url_perma: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    });

    todo.associate = models => {
        todo.belongsTo(models.users, { as: "ownerPosting", foreignKey: 'id_post_user'})
        todo.hasMany(models.tags, { as: 'tagPosts', foreignKey: 'id_posts'})
        todo.hasMany(models.like, { as: 'likePosts', foreignKey: 'id_posts'})
        todo.belongsToMany(models.categorys, { as: "category_postingan", through: 'categoryPosts' })
    }

    return todo;
};
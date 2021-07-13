const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const todo =  sequelize.define('users', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
              notNull: true
            }
        },
        username: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        profile_photo: {
            allowNull:false,
            type: DataTypes.STRING
        },
        bio: {
          allowNull: false,
          type: DataTypes.TEXT
        },
        noTelp: {
          allowNull: false,
          type: DataTypes.TEXT
        },
        verification: {
          allowNull: false,
          type: DataTypes.STRING,
          defaultValue: 'false'
        },
        password: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
    });

    todo.associate = models => {
      todo.hasMany(models.follows, { as: 'followers', foreignKey: 'who_follow' })
      todo.hasMany(models.follows, { as: 'following', foreignKey: 'id_follow' })
      todo.hasMany(models.posts, { as: 'posts', foreignKey: 'id_post_user' })
      todo.hasMany(models.like, { as: 'userLike', foreignKey: 'id_users' })
      todo.hasMany(models.like, { as: 'postLike', foreignKey: 'id_posts' })
      todo.belongsToMany(models.categorys, { as: "ownerCategory", through: 'ownerCategorys' })
    }


    return todo;
};
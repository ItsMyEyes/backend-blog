module.exports = (sequelize, DataTypes) => {
    const categoryPosts = sequelize.define('categoryPosts', {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id'
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categorys',
          key: 'id'
        }
      }
    });
    return categoryPosts;
};
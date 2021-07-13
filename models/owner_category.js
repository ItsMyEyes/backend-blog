module.exports = (sequelize, DataTypes) => {
    const ownerCategorys = sequelize.define('ownerCategorys', {
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categorys',
          key: 'id'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    });
    return ownerCategorys;
};
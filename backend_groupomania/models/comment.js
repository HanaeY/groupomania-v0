'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Comment.belongsTo(models.Article, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
      }),
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
      })
    }
  };
  Comment.init({
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
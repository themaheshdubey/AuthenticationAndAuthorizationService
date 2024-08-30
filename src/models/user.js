'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'roleId' });
    }
  }
  User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        },
        allowNull: false
    },
    airlineId: {
        type: DataTypes.INTEGER,
        allowNull: true // Nullable for non-airlineAdmin roles
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
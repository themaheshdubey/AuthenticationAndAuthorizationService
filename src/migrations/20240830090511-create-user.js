'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false
      },
      roleId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'Roles',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false
      },
      airlineId: {
          type: Sequelize.INTEGER,
          allowNull: true
      },
      createdAt: {
          type: Sequelize.DATE,
          allowNull: false
      },
      updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
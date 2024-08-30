'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
          roleName: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          roleName: 'airlineAdmin',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          roleName: 'normal user',
          createdAt: new Date(),
          updatedAt: new Date()
      }
  ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', {
      roleName: ['admin', 'airlineAdmin', 'normal user']
  }, {});
  }
};

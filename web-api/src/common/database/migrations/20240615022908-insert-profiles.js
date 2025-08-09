'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({
      tableName: 'profiles',
      schema: 'dbo'
    }, [
      { id: 1, name: 'Administrador', status: 1, created_at: new Date(), updated_at: new Date() },
      { id: 3, name: 'Usuário', status: 1, created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({
      tableName: 'profiles',
      schema: 'dbo'
    }, null, {});
  }
};

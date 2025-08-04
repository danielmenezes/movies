'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('dbo');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropSchema('dbo');
  }
};

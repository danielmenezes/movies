'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('dbo');
    await queryInterface.createTable(
      {
        schema: 'dbo',
        tableName: 'profiles'
      },
      {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true
        },
        status: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
          allowNull: false
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({ schema: 'dbo', tableName: 'profiles' });
  }
};

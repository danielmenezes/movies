'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable({
      tableName: 'users',
      schema: 'dbo'
    }, {
      firebase_uid: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING(11),
        unique: true
      },
      rg: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      birth_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      uf: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING(250)
      },
      address_number: {
        allowNull: true,
        type: Sequelize.STRING(10)
      },
      phone: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      profile_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            schema: 'dbo',
            tableName: 'profiles'
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({ schema: 'dbo', tableName: 'users' });
  }
};
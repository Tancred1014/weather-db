'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('weather_caches', {
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      data: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('weather_caches');
  }
};
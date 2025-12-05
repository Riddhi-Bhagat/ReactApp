"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("logs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" }, // <-- match Users table
        onDelete: "CASCADE",
        allowNull: false
      },
      login_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("logs");
  },
};

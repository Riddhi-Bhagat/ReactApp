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
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
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

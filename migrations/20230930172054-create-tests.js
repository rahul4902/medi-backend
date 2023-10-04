"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable(
      "tests",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        department: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        name: { type: Sequelize.STRING, allowNull: false },
        code: { type: Sequelize.STRING, allowNull: true },
        gender: { type: Sequelize.STRING, allowNull: true },
        color_code: { type: Sequelize.STRING, allowNull: true },
        type: { type: Sequelize.STRING, allowNull: true },
        sample_qty: { type: Sequelize.STRING, allowNull: true },
        remark: { type: Sequelize.STRING, allowNull: true },
        report_type: { type: Sequelize.STRING, allowNull: true },
        sort_name: { type: Sequelize.STRING, allowNull: true },
        rate: { type: Sequelize.STRING, allowNull: true },
        mrp: { type: Sequelize.STRING, allowNull: true },
        auto_consume: { type: Sequelize.STRING, allowNull: true },
        concent_form: { type: Sequelize.STRING, allowNull: true },
        billing_category: { type: Sequelize.STRING, allowNull: true },
        max_discount: { type: Sequelize.STRING, allowNull: true },
        status: { type: Sequelize.BOOLEAN, default: false },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        timestamps: true,
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("tests");
  },
};

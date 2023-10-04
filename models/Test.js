// models/user.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

const Test = sequelize.define("Test", {
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: true },
  gender: { type: DataTypes.STRING, allowNull: true },
  color_code: { type: DataTypes.STRING, allowNull: true },
  type: { type: DataTypes.STRING, allowNull: true },
  sample_qty: { type: DataTypes.STRING, allowNull: true },
  remark: { type: DataTypes.STRING, allowNull: true },
  report_type: { type: DataTypes.STRING, allowNull: true },
  sort_name: { type: DataTypes.STRING, allowNull: true },
  rate: { type: DataTypes.STRING, allowNull: true },
  mrp: { type: DataTypes.STRING, allowNull: true },
  auto_consume: { type: DataTypes.STRING, allowNull: true },
  concent_form: { type: DataTypes.STRING, allowNull: true },
  billing_category: { type: DataTypes.STRING, allowNull: true },
  max_discount: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.BOOLEAN, default: false },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
});

module.exports = Test;

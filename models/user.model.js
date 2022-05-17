//Extentions
const { DataTypes } = require('sequelize');

//Export database
const { db } = require('../utils/database');

//Model user
const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { User };

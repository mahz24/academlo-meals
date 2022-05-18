//Extentions
const { DataTypes } = require('sequelize');

//Export database
const { db } = require('../utils/database');

//Model
const Review = db.define('review', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Review };

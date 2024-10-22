// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,                           
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(30), // Adjusting the length to match the schema
    allowNull: false,
    unique: true, // Ensuring the phone number is unique
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true, // Allowing null as per your schema
    defaultValue: DataTypes.NOW, // Default to current timestamp
  },
}, {
  tableName: 'Users',
  timestamps: false, // Setting to false as you are managing timestamps manually
});

module.exports = User;

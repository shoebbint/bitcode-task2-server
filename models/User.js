
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
    type: DataTypes.STRING(30), 
    allowNull: false,
    unique: true, 
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true, 
    defaultValue: DataTypes.NOW, 
  },
}, {
  tableName: 'Users',
  timestamps: false, 
});

module.exports = User;

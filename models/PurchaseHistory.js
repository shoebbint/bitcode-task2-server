const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PurchaseHistory = sequelize.define('PurchaseHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_no: {
    type: DataTypes.INTEGER,
    allowNull: false, // Changed to not allow nulls
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allowing null as per your schema
    references: {
      model: 'Users', // Name of the Users table
      key: 'id',
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allowing null as per your schema
    references: {
      model: 'Products', // Name of the Products table
      key: 'id',
    },
  },
  purchase_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true, // Allowing null as per your schema
    defaultValue: DataTypes.NOW, // Set the default value to the current timestamp
  },
}, {
  tableName: 'PurchaseHistory',
  timestamps: false, // Setting to false since you're managing timestamps manually
});

module.exports = PurchaseHistory;

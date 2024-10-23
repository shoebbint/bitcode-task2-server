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
    allowNull: false, 
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    references: {
      model: 'Users', 
      key: 'id',
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    references: {
      model: 'Products', 
      key: 'id',
    },
  },
  purchase_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true, 
    defaultValue: DataTypes.NOW, 
  },
}, {
  tableName: 'PurchaseHistory',
  timestamps: false, 
});

module.exports = PurchaseHistory;

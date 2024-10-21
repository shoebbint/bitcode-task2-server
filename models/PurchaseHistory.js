// models/PurchaseHistory.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PurchaseHistory = sequelize.define('PurchaseHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = PurchaseHistory;

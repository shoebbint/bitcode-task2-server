// models/Product.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Adjust the path accordingly

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: false, // Adjust if you have created_at/updated_at columns
});

module.exports = Product;

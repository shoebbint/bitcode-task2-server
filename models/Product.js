
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

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
    timestamps: false, 
});

module.exports = Product;

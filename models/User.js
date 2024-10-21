// models/User.js
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Ensure this path is correct

class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Add any additional fields needed
}, {
    sequelize,
    modelName: 'User',
});

module.exports = User;

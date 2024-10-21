// config/db.js
const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
    host: 'localhost',
    dialect: 'sqlite', // Make sure this matches your database type
});

module.exports = { sequelize };

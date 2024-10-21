// config/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', // Use an in-memory database for testing
    logging: false, // Disable logging to avoid cluttering the output
});

module.exports = { sequelize };

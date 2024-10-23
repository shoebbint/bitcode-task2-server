// TIDBConnection.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const sequelize = new Sequelize(process.env.TIDB_NAME, process.env.TIDB_USER, process.env.TIDB_PASSWORD, {
  host: process.env.TIDB_HOST,
  dialect: 'mysql',
  port: process.env.TIDB_PORT,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = { sequelize };

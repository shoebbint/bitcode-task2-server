// TIDBConnection.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file
const fs = require('fs'); // Import file system module to read CA file

const sequelize = new Sequelize(process.env.TIDB_NAME, process.env.TIDB_USER, process.env.TIDB_PASSWORD, {
  host: process.env.TIDB_HOST,
  dialect: 'mysql',
  port: process.env.TIDB_PORT,
  dialectModule: require('mysql2'),
  dialectOptions: {
    ssl: {
      require: true, // This option is required for secure connections
      rejectUnauthorized: true, // Validate server's certificate
      ca: process.env.CA_PATH ? fs.readFileSync(process.env.CA_PATH) : undefined, // Read CA certificate from file if provided
    },
  },
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

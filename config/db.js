// dbConnection.js
const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('bitcode_db', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, // Ensure this is the correct port
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the test function
testConnection();

// Export the Sequelize instance
module.exports = { sequelize };

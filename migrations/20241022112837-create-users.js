// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//       await queryInterface.createTable('Users', {
//           id: {
//               type: Sequelize.INTEGER,
//               autoIncrement: true,
//               primaryKey: true,
//           },
//           name: {
//               type: Sequelize.STRING,
//               allowNull: false,
//           },
//           phone: {
//               type: Sequelize.STRING,
//               allowNull: false,
//               unique: true, // Ensure phone is unique if needed
//           },
//           createdAt: {
//               type: Sequelize.DATE,
//               defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//           },
//           updatedAt: {
//               type: Sequelize.DATE,
//               defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//           },
//       });
//   },

//   down: async (queryInterface, Sequelize) => {
//       await queryInterface.dropTable('Users');
//   }
// };

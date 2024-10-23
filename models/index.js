
const User = require('./User');
const Product = require('./Product');
const PurchaseHistory = require('./PurchaseHistory');

User.hasMany(PurchaseHistory, { foreignKey: 'user_id' });
Product.hasMany(PurchaseHistory, { foreignKey: 'product_id' });
PurchaseHistory.belongsTo(User, { foreignKey: 'user_id' });
PurchaseHistory.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { User, Product, PurchaseHistory };

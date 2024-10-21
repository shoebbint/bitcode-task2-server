const User = require('../models/User');
const Product = require('../models/Product');
const PurchaseHistory = require('../models/PurchaseHistory');
const { sequelize } = require('../config/db');

describe('Model Tests', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Resets the database for testing
    });
    

    it('should create a new user', async () => {
        const user = await User.create({ name: 'John Doe', email: 'john@example.com' });
        expect(user.name).toBe('John Doe');
    });

    it('should create a new product', async () => {
        const product = await Product.create({ name: 'Chair', price: 50.00 });
        expect(product.name).toBe('Chair');
    });

    it('should create a purchase history record', async () => {
        const user = await User.create({ name: 'Jane Doe', email: 'jane@example.com' });
        const product = await Product.create({ name: 'Table', price: 100.00 });
        const purchaseHistory = await PurchaseHistory.create({ user_id: user.id, product_id: product.id, quantity: 1 });
        expect(purchaseHistory.quantity).toBe(1);
    });
});

const request = require('supertest');
const app = require('../api/index');
const { sequelize } = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const PurchaseHistory = require('../models/PurchaseHistory');

beforeAll(async () => {

    await sequelize.sync({ force: true });


    await User.bulkCreate([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ]);

    await Product.bulkCreate([
        { id: 1, name: 'Chair', price: 50 },
        { id: 2, name: 'Table', price: 100 },
    ]);

    await PurchaseHistory.bulkCreate([
        { user_id: 1, product_id: 1, quantity: 2 },
        { user_id: 2, product_id: 2, quantity: 1 },
    ]);
});


afterAll(async () => {

    await sequelize.close();
});

describe('API Tests', () => {
    it('should respond to a GET request', async () => {
        const res = await request(app).get('/api/reports');
        expect(res.statusCode).toBe(200);

    });
});

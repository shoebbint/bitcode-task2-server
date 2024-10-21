const { sequelize } = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const PurchaseHistory = require('../models/PurchaseHistory');


const generateReport = async (req, res) => {
    try {
        const results = await sequelize.query(`
            SELECT u.name AS CustomerName, 
                   u.email AS Email,
                   p.name AS ProductName,
                   ph.quantity,
                   p.price,
                   (ph.quantity * p.price) AS Total
            FROM PurchaseHistories ph
            JOIN Users u ON ph.user_id = u.id
            JOIN Products p ON ph.product_id = p.id
            ORDER BY Total DESC;
        `);

        const grossTotal = await sequelize.query(`
            SELECT SUM(ph.quantity * p.price) AS GrossTotal
            FROM PurchaseHistories ph
            JOIN Products p ON ph.product_id = p.id;
        `);

        res.json({
            report: results[0],
            grossTotal: grossTotal[0][0].GrossTotal,
        });
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
};

module.exports = { generateReport };

const { sequelize } = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const PurchaseHistory = require('../models/PurchaseHistory');

const generateReport = async (req, res) => {
    try {
        const results = await sequelize.query(`
            SELECT 
                p.product_name AS ProductName,
                u.name AS CustomerName,
                SUM(ph.purchase_quantity) AS TotalQuantity,
                p.product_price AS Price,
                SUM(ph.purchase_quantity * p.product_price) AS TotalSpent
            FROM 
                PurchaseHistory ph
            JOIN 
                Users u ON ph.user_id = u.id
            JOIN 
                Products p ON ph.product_id = p.id
            GROUP BY 
                p.product_name, u.name, p.product_price
            ORDER BY 
                TotalSpent DESC;
        `);

        res.json({
            report: results[0], // Send the report data as a response
        });
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
};


module.exports = { generateReport };

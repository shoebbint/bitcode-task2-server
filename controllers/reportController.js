const { sequelize } = require("../config/db");
const User = require("../models/User");
const Product = require("../models/Product");
const PurchaseHistory = require("../models/PurchaseHistory");

const generateReport = async (req, res) => {
  try {
    const results = await sequelize.query(`

WITH PurchaseSummary AS (
    SELECT 
        p.product_name AS ProductName,
        u.name AS CustomerName,
        SUM(ph.purchase_quantity) AS Quantity,
        MAX(p.product_price) AS Price,  -- Price per product
        SUM(ph.purchase_quantity * p.product_price) AS Total  -- Total spent per product
    FROM 
        PurchaseHistory ph
    JOIN 
        Users u ON ph.user_id = u.id
    JOIN 
        Products p ON ph.product_id = p.id
    GROUP BY 
        p.product_name, u.name
)

SELECT 
    ProductName,
    CustomerName,
    Quantity,
    Price,
    Total
FROM 
    PurchaseSummary

UNION ALL

SELECT 
    'Gross Total:' AS ProductName,
    NULL AS CustomerName,
    SUM(Quantity) AS Quantity,
    SUM(Total / NULLIF(Quantity, 0)) AS Price,  -- This is the sum of maximum prices
    SUM(Total) AS Total
FROM 
    PurchaseSummary;


        `);

    res.json({
      report: results[0],
    });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};

module.exports = { generateReport };

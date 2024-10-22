const User = require('../models/User'); // Ensure the path is correct
const { sequelize } = require('../config/db'); // Adjust this path if necessary
const Product = require('../models/Product');
const PurchaseHistory = require('../models/PurchaseHistory');
const axios = require('axios');
const { API_URL } = require('../config/api'); // Ensure API_URL is defined in your config

const fetchDataAndStore = async (req, res) => {
    try {
        console.log("Fetching data from API...");
        const response = await axios.get(API_URL);
        const data = response.data;
        console.log("Data fetched successfully:", data);

        for (const purchase of data) {
            // Using user_phone instead of user_email
            const [user] = await User.findOrCreate({
                where: { phone: purchase.user_phone },
                defaults: { name: purchase.name },
            });

            // Use product_code to find or create products
            const [product] = await Product.findOrCreate({
                where: { product_code: purchase.product_code }, // Use product_code for unique identification
                defaults: {
                    product_name: purchase.product_name,
                    product_price: parseFloat(purchase.product_price),
                },
            });

            // Create PurchaseHistory record using updated schema
            await PurchaseHistory.create({
                order_no: purchase.order_no, // Ensure that order_no is provided in the purchase data
                user_id: user.id,
                product_id: product.id,
                purchase_quantity: purchase.purchase_quantity, // Updated to match schema
            });

            console.log(`Stored purchase: ${purchase.product_name}, Quantity: ${purchase.purchase_quantity}`);
        }

        res.json({ message: 'Data fetched and stored successfully' });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};





module.exports = { fetchDataAndStore };

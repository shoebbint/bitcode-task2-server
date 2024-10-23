const User = require('../models/User'); 
const { sequelize } = require('../config/db'); 
const Product = require('../models/Product');
const PurchaseHistory = require('../models/PurchaseHistory');
const axios = require('axios');
const { API_URL } = require('../config/api'); 

const fetchDataAndStore = async (req, res) => {
    const transaction = await sequelize.transaction(); // Start a transaction
    try {
        console.log("Fetching data from API...");
        const response = await axios.get(API_URL);
        const data = response.data;
        console.log("Data fetched successfully:", data);

        for (const purchase of data) {
            const [user] = await User.findOrCreate({
                where: { phone: purchase.user_phone },
                defaults: { name: purchase.name },
                transaction // Use transaction
            }).catch(err => {
                console.error(`Error creating/finding user: ${err.message}`);
            });

            const [product] = await Product.findOrCreate({
                where: { product_code: purchase.product_code }, 
                defaults: {
                    product_name: purchase.product_name,
                    product_price: parseFloat(purchase.product_price),
                },
                transaction // Use transaction
            }).catch(err => {
                console.error(`Error creating/finding product: ${err.message}`);
            });

            await PurchaseHistory.create({
                order_no: purchase.order_no,
                user_id: user?.id, // Check if user exists
                product_id: product?.id, // Check if product exists
                purchase_quantity: purchase.purchase_quantity, 
            }, { transaction }) // Use transaction
            .catch(err => {
                console.error(`Error creating purchase history: ${err.message}`);
            });

            console.log(`Stored purchase: ${purchase.product_name}, Quantity: ${purchase.purchase_quantity}`);
        }

        await transaction.commit(); // Commit the transaction
        res.json({ message: 'Data fetched and stored successfully' });
    } catch (error) {
        console.error('Error fetching data:', error);
        await transaction.rollback(); // Rollback the transaction on error
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

module.exports = { fetchDataAndStore };

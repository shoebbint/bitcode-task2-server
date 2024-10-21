const User = require('../models/User'); // Ensure the path is correct
const Product = require('../models/Product');
const PurchaseHistory = require('../models/PurchaseHistory');
const axios = require('axios');
const { API_URL } = require('../config/api'); // Ensure API_URL is defined in your config


const fetchDataAndStore = async (req, res) => {
    try {
        console.log("Fetching data from API..."); // Log when the fetching starts
        const response = await axios.get(API_URL);
        const data = response.data;
        console.log("Data fetched successfully:", data); // Log the fetched data

        for (const purchase of data) {
            // Assuming the structure of 'purchase' contains user_email and user_name
            const [user] = await User.findOrCreate({
                where: { email: purchase.user_email }, // Adjusted to match your JSON structure
                defaults: { name: purchase.user_name }, // Adjusted to match your JSON structure
            });

            const [product] = await Product.findOrCreate({
                where: { name: purchase.product_name }, // Adjusted to match your JSON structure
                defaults: { price: purchase.product_price }, // Adjusted to match your JSON structure
            });

            await PurchaseHistory.create({
                user_id: user.id,
                product_id: product.id,
                quantity: purchase.purchase_quantity, // Adjusted to match your JSON structure
            });

            console.log(`Stored purchase: ${purchase.product_name}, Quantity: ${purchase.purchase_quantity}`); // Log each stored purchase
        }

        res.json({ message: 'Data fetched and stored successfully' });
    } catch (error) {
        console.error('Error fetching data:', error); // Log any errors that occur
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};


module.exports = { fetchDataAndStore };

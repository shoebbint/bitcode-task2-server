const { User } = require('../models/User');
const { Product } = require('../models/Product');
const { PurchaseHistory } = require('../models/PurchaseHistory');
const axios = require('axios');


const { API_URL } = require('../config/api');

const fetchDataAndStore = async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        const data = response.data;

        for (const purchase of data) {
            const [user] = await User.findOrCreate({
                where: { email: purchase.userEmail },
                defaults: { name: purchase.userName },
            });

            const [product] = await Product.findOrCreate({
                where: { name: purchase.productName },
                defaults: { price: purchase.price },
            });

            await PurchaseHistory.create({
                user_id: user.id,
                product_id: product.id,
                quantity: purchase.quantity,
            });
        }

        res.json({ message: 'Data fetched and stored successfully' });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

module.exports = { fetchDataAndStore };

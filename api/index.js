const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const reportRoutes = require('./reports');
const dataRoutes = require('./fetchData'); 
const { sequelize } = require('../config/db');

// Configure CORS to allow requests from your frontend
const corsOptions = {
    origin: 'https://bitcode-frontend-task.vercel.app', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if necessary
    credentials: true // Allow credentials if you're using cookies or HTTP Auth
};

app.use(cors(corsOptions)); // Use the configured CORS options
app.use(express.json());
app.use('/api/reports', reportRoutes);
app.use('/api', dataRoutes); 

sequelize.sync() 
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to sync the database:', error);
    });

module.exports = app;

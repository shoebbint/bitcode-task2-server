const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const reportRoutes = require('./reports');
const dataRoutes = require('./fetchData'); 
const { sequelize } = require('../config/db');

// CORS options
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://bitcode-frontend-task.vercel.app/' : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};


app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Route handlers
app.use('/api/reports', reportRoutes); // Reports routes
app.use('/api', dataRoutes); // Data routes

// Sync the database and start the server
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

module.exports = app; // Export the app for testing or other purposes

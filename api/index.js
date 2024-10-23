const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const reportRoutes = require('./reports');
const dataRoutes = require('./fetchData'); 
const { sequelize } = require('../config/db');

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

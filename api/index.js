const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const reportRoutes = require('./reports');
const dataRoutes = require('./fetchData'); // Adjust the path if needed
app.use('/api', dataRoutes); // This will expose /api/fetchData


app.use(express.json());
app.use('/api/reports', reportRoutes);
app.use('/api', dataRoutes); // Register the data routes

// Export the app for testing
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;

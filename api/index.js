const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const reportRoutes = require('./reports');

app.use(express.json());
app.use('/api/reports', reportRoutes);

// Export the app for testing
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;

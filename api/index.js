const express = require('express');
const bodyParser = require('body-parser');
const fetchDataRoutes = require('./fetchData');
const reportRoutes = require('./reports');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use API routes
app.use('/api/fetch', fetchDataRoutes);
app.use('/api/reports', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const { fetchDataAndStore } = require('../controllers/fetchController');
const router = express.Router();

router.get('/fetchData', fetchDataAndStore);

module.exports = router;

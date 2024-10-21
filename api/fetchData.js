const express = require('express');
const { fetchDataAndStore } = require('../controllers/fetchController');
const router = express.Router();

router.post('/', fetchDataAndStore);

module.exports = router;

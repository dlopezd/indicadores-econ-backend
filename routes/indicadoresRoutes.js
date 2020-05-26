const express = require('express');

const indicadoresController = require('../controllers/indicadoresController');

const router = express.Router();

router.get('/last', indicadoresController.last);

module.exports = router;

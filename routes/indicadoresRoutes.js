const express = require('express');

const indicadoresController = require('../controllers/indicadoresController');

const router = express.Router();

router.get('/last', indicadoresController.last);
router.get('/values/:key', indicadoresController.values);

module.exports = router;

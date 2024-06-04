const express = require('express');
const router = express.Router();
const hitosController = require('../controllers/hitosController');

router.post('/create', hitosController.crearHito);

module.exports = router;

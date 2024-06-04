const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');

router.post('/create', tareasController.crearTarea);
router.get('/getAll', tareasController.obtenerTareas);

module.exports = router;

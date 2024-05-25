// En tus rutas (routes/usuarioRoutes.js)
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para verificar si el usuario está registrado
router.post('/', userController.verificarRegistro, );

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para usuarios
router.post('/registrar', userController.registrarUsuario);
router.post('/login', userController.logearUsuario);
router.post('/perfil', userController.logearUsuario);

module.exports = router;
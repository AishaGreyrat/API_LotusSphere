const express = require('express');
const router = express.Router();


// Rutas para el controlador

const index = require('./index');
const login = require('./login');
const registrar = require('./registrar');
const verificarregistro = require('./verificar-registro');

router.use('/', index);
router.use('/login', login);
router.use('/registrar', registrar);
router.use('/verificar-registro', verificarregistro);

module.exports = router;
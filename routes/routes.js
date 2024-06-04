const express = require('express');
const router = express.Router();


// Rutas para el controlador

const index = require('./index');
router.use('/', index);

const usuariosRoute = require('./usuariosRoute');
const proyectosRoute = require('./proyectosRoute');
const tareas = require('./tareas');
const hitos = require('./hitos');

router.use('/usuarios', usuariosRoute);
router.use('/proyectos', proyectosRoute);
router.use('/tareas', tareas);
router.use('/hitos', hitos);

module.exports = router;
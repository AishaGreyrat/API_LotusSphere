const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectoController');
const { verificarToken } = require('../middlewares/autenticador');

// Rutas para usuarios
router.get('/getAll',  proyectosController.obtenerProyectos);
router.post('/createNew', proyectosController.crearProyecto);
router.get('/obtenerProyectoId/:id', proyectosController.obtenerProyectoPorId);
router.delete('/deleteProyecto/:id', proyectosController.eliminarProyecto);
router.get('obtenerTareasPorProyectoId', proyectosController.editarProyecto);

module.exports = router;

const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/userController');

// Definir la ruta de registro
router.post('/', async (req, res) => {
  try {
    const dataSegura = req.body.dataSegura; // Asumiendo que los datos vienen en el cuerpo de la solicitud
    const resultado = await registrarUsuario(dataSegura);
    res.status(201).json({ mensaje: 'Registro exitoso', data: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el registro', error: error.message });
  }
});

module.exports = router;


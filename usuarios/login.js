const express = require('express');
const router = express.Router();

// Definir la ruta de login
router.post('/', (req, res) => {
  res.send('Login exitoso');
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Definir la ruta de login
router.get('/', (req, res) => {
  res.send('API');
});

module.exports = router;
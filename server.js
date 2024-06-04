const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');

dotenv.config();

app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const router = require('./routes/routes.js');
app.use('/', router);

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
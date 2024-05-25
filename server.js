const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userController = require('./controllers/userController.js')
const router = require('./usuarios/routes.js');


// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('API');
});



app.post('/usuarios/registrar', async (req, res) => {
  const dataSegura = req.body.dataSegura;
  console.log('datasegura = ', dataSegura);

  try {
    const resultado = await userController.registrarUsuario(dataSegura);
    console.log('registro = ', resultado);
    console.log('dataSegura = ', dataSegura);
    res.status(201).json({ mensaje: 'Registro exitoso', data: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el registro', error: error.message });
  }
});


app.post('/usuarios/verificar-registro', async (req, res) => {
  // Obtener el nombre del usuario desde el cuerpo de la solicitud
  const nombre = req.body.nombre;
  console.log('se pudo', nombre);
  
  // Llamar a la función del controlador y pasar el nombre del usuario
  try {
      console.log('antes del resultado');
      const resultado = await userController.verificarRegistro(nombre);
      console.log('resultado = ', resultado);
      res.status(resultado.status).send(resultado.message);
      
  } catch (error) {
      console.error('Error al verificar registro:', error);
      res.status(500).send('Error interno del servidor');
  }
});



const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
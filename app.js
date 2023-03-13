const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configuramos el middleware
app.use(bodyParser.json());
app.use(cors());

// Configuramos una ruta para una solicitud GET
app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

// Configuramos una ruta para una solicitud POST
app.post('/mensaje', (req, res) => {
  const mensaje = req.body.mensaje;
  console.log(mensaje);
  res.send(`Mensaje recibido: ${mensaje}`);
});

// Iniciamos el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
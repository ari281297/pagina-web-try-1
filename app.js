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

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Configuramos la estrategia de autenticación local
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Aquí debes verificar si el usuario y contraseña son válidos
    if (username === 'usuario' && password === 'contraseña') {
      return done(null, { username });
    } else {
      return done(null, false);
    }
  }
));

// Configuramos la serialización y deserialización de usuarios
passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  done(null, { username });
});

// Configuramos Passport.js para usar las funciones de serialización y deserialización
app.use(passport.initialize());
app.use(passport.session());

// Configuramos una ruta para mostrar la vista de inicio de sesión
app.get('/login', (req, res) => {
    res.render('login');
  });
  
  // Configuramos una ruta para manejar las solicitudes de autenticación
  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );
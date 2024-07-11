const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const db = require('../db');
const routerLogin = express.Router();

routerLogin.use(express.json());
routerLogin.use(cookieParser());

routerLogin.post('/login', async (req, res) => {
  const { username, password } = req.body;

  let sql = 'SELECT * FROM usuarios WHERE nombre = ?';

  try {
    // Ejecutar la consulta a la base de datos
    const [results] = await db.query(sql, [username]);

    // Verificar si se encontró algún usuario
    if (results.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Asumiendo que la consulta devuelve un solo usuario
    const user = results[0];

    // Comparar la contraseña proporcionada con la almacenada
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send('Contraseña incorrecta');
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.id }, 'tu_secreto_aqui', { expiresIn: '1h' });

    // Enviar el token en una cookie
    res.cookie('auth_token', token, { httpOnly: true, secure: true });
    res.send('Login exitoso');
  } catch (error) {
    // Manejar posibles errores de la consulta o de bcrypt
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

routerLogin.post('/logout', (req, res) => {
  // Eliminar la cookie de autenticación estableciendo una fecha de expiración en el pasado
  res.cookie('auth_token', '', { expires: new Date(0) });



  // Enviar una respuesta al cliente indicando que el cierre de sesión fue exitoso
  res.send('Sesión cerrada con éxito');
});

module.exports = routerLogin;
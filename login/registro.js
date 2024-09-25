const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const db = require('../db/conection')
const routerRegistro = express.Router()

routerRegistro.use(express.json())
routerRegistro.use(cookieParser())

routerRegistro.post('/api/listadelacompra/registro', async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { nombre, apellidos, contraseña } = req.body;
    console.log({nombre, apellidos, contraseña});
    // Hashear la contraseña antes de almacenarla
    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);
    console.log(contraseñaHasheada);
    let sql = 'INSERT INTO usuarios (nombre, apellidos, contraseña) VALUES (?, ?, ?)';
    db.query(sql, [nombre, apellidos, contraseñaHasheada], async (error, resultados) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      // Asumiendo que necesitas el ID del usuario insertado, lo obtienes aquí (depende de tu DBMS)
      const userId = resultados.insertId; // Ajustado para reflejar un nombre de propiedad más común
      console.log(userId);

      // Generar un token JWT para el usuario
      const token =  jwt.sign({
        sub: userId, // Identificador único del usuario
      },
      process.env.JWT_SECRET, // La clave secreta para firmar el JWT
      { expiresIn: '1h' } // El token expira en 1 hora
      );

      // Guardar el token en una cookie
      res.cookie('auth_token', token, { httpOnly: true, secure: true });

      res.status(201).send({ mensaje: 'Usuario registrado con éxito' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



module.exports = routerRegistro


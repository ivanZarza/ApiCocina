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
    if (!nombre || !apellidos || !contraseña) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Comprobar si el usuario ya existe
    let sqlComprobar = 'SELECT * FROM usuarios WHERE nombre = ? AND apellidos = ?';
    db.query(sqlComprobar, [nombre, apellidos], async (error, resultados) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      if (resultados.length > 0) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }

    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    let sql = 'INSERT INTO usuarios (nombre, apellidos, contraseña) VALUES (?, ?, ?)';
    db.query(sql, [nombre, apellidos, contraseñaHasheada],(error, resultados) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
//insertId es una propiedad explicita de la libreria mysql que devuelve el id del último registro insertado en la base de datos
      const usuarioId = resultados.insertId 
      // Generar un token JWT para el usuario
      const token =  jwt.sign({ id:usuarioId, nombre:nombre },process.env.JWT_SECRET, { expiresIn: '30s' })

      // Guardar el token en una cookie
      res.cookie('auth_token', token/* , { httpOnly: true, secure: true } */);

      res.status(201).json({ id: usuarioId });
    })
  })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



module.exports = routerRegistro


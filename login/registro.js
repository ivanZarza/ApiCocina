const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const db = require('../db')
const routerRegistro = express.Router()

routerRegistro.use(express.json())
routerRegistro.use(cookieParser())

routerRegistro.post('/registro', async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { nombre,apellidos, contraseña} = req.body

    // Hashear la contraseña antes de almacenarla
    const contraseñaHasheada = await bcrypt.hash(contraseña, 10)

    let sql = 'INSERT INTO usuarios (nombre,apellidos, contraseña) VALUES (?, ?, ?)'
    db.query(sql, [nombre,apellidos, contraseñaHasheada], async (error, resultados) => {
      if (error) {
        console.error(error)
        return res.status(500).json({ error: 'Error interno del servidor' })
      }

      // Generar un token JWT para el usuario
      const token = await jwt.sign({ nombre }, 'tu_secreto_aqui', { expiresIn: '1h' })

      // Guardar el token en una cookie
      res.cookie('auth_token', token, { httpOnly: true, secure: true })

      res.status(201).send({ mensaje: 'Usuario registrado con éxito' })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

module.exports = routerRegistro


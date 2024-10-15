const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db/conection')


const routerLogin = express.Router()

routerLogin.use(express.json())

routerLogin.post('/api/listadelacompra/login', async (req, res) => {
  try {
    const { nombre, apellidos, contraseña } = req.body
    if (!nombre || !apellidos || !contraseña) {
      res.status(400).send('Faltan datos obligatorios')
      return;
    }

    let sql = 'SELECT * FROM usuarios WHERE nombre = ? AND apellidos = ?'
    db.query(sql, [nombre, apellidos], (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error en el servidor')
        return;
      }

      if (results.length === 0) {
        return res.status(404).send('Usuario no encontrado')
      }

      const [user] = results;

      bcrypt.compare(contraseña, user.contraseña, (err, match) => {
        if (err) {
          console.error(err)
          res.status(500).send('Error en el servidor')
          return;
        }

        if (!match) {
          res.status(401).send('Contraseña incorrecta');
          return;
        }

        const token = jwt.sign({ id: user.usuId, nombre:user.nombre }, process.env.JWT_SECRET, { expiresIn: '1h' })

        const datosUsuario = {
          nombre: user.nombre,
          apellidos: user.apellidos,
        }

        res.cookie('auth_token', token/*, { httpOnly: true, secure: true, sameSite: 'none' } */) 
        res.status(201).json(datosUsuario)
      })
    })
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inesperado en el servidor');
  }
})






module.exports = routerLogin

/* CONTRASE ÑA PARA ivan zarza estevez3ST3V3z99! */

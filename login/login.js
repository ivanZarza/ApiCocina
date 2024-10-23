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
      res.status(400).json('Faltan datos obligatorios')
      return;
    }

    let sql = 'SELECT * FROM usuarios WHERE nombre = ? AND apellidos = ?'
    db.query(sql, [nombre, apellidos], (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error:'Error en el servidor'})
        
      }

      if (results.length === 0) {
        return res.status(404).json({ error:'Usuario no encontrado'})
      }

      const [user] = results;

      bcrypt.compare(contraseña, user.contraseña, (err, match) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ error:'Error en el servidor'})

        }

        if (!match) {
          return res.status(401).json({ error:'Contraseña incorrecta'});
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
    res.status(500).json({ error: 'Error inesperado en el servidor'});
  }
})






module.exports = routerLogin

/* CONTRASE ÑA PARA ivan zarza estevez3ST3V3z99! */

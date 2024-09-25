const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db/conection')


const routerLogin = express.Router()

routerLogin.use(express.json())

routerLogin.post('/api/listadelacompra/login', async (req, res) => {
  const { nombre, apellidos, contraseña } = req.body;
  console.log(nombre, apellidos, contraseña);
  let sql = 'SELECT * FROM usuarios WHERE nombre = ? AND apellidos = ?';

  db.query(sql, [nombre, apellidos], (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error en el servidor')
      return
    }

    console.log('results', results)

    if (results.length === 0) {
      res.status(404).send('Usuario no encontrado')
      return
    }

    const [user] = results

    console.log('user is', `${user.nombre} ${user.apellidos}`)

    bcrypt.compare(contraseña, user.contraseña, (err, match) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error en el servidor')
        return
      }

      if (!match) {
        res.status(401).send('Contraseña incorrecta')
        return
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

      const userData = {
        id: user.usuId,
        nombre: user.nombre,
        apellidos: user.apellidos,
      }
      
      
      
      res.cookie('auth_token', token)
      res.send({mensaje: 'Inicio de sesión exitoso', user: userData})
    }
    )
  })
})






module.exports = routerLogin

/* CONTRASE ÑA PARA ivan zarza estevez3ST3V3z99! */

const express = require('express')
const routerMe = express.Router()
const db = require('../db/conection')

routerMe.use(express.json())

routerMe.get('/api/listadelacompra/me', (req, res) => {
  const userId = req.user.usuId; // Obtener el ID del usuario de la URL
  console.log('linea 9 ME', req.user.usuId );

  // Consulta SQL para obtener los datos del usuario por ID
  const sql = 'SELECT nombre, apellidos FROM usuarios WHERE usuId = ?'

  db.query(sql, [userId], (error, results) => {
    if (error) {
      // Manejar el error de la consulta
      console.error('linea 16 ME','Error al realizar la consulta:', error)
      return res.status(500).send('Error al obtener los datos del usuario')
    }

    if (results.length > 0) {
      // Si se encontraron datos, enviarlos como respuesta
      res.json(results[0]);
    } else {
      // Si no se encontraron datos, enviar una respuesta indicando que el usuario no existe
      res.status(404).send('Usuario no encontrado')
    }
  })
})

module.exports = routerMe;
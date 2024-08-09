const express = require('express')
const authMiddleware = require('../helpers/authMiddleware')
const routerMe = express.Router()

routerMe.use(express.json())

routerMe.get('/api/listadelacompra/usuario/:id', authMiddleware, (req, res) => {
  const userId = req.params.id; // Obtener el ID del usuario de la URL

  // Consulta SQL para obtener los datos del usuario por ID
  const sql = 'SELECT * FROM usuarios WHERE id = ?';

  db.query(sql, [userId], (error, results) => {
    if (error) {
      // Manejar el error de la consulta
      console.error('Error al realizar la consulta:', error);
      return res.status(500).send('Error al obtener los datos del usuario');
    }

    if (results.length > 0) {
      // Si se encontraron datos, enviarlos como respuesta
      res.json(results[0]);
    } else {
      // Si no se encontraron datos, enviar una respuesta indicando que el usuario no existe
      res.status(404).send('Usuario no encontrado');
    }
  });
});

module.exports = routerMe;
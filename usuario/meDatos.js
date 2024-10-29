const express = require('express')
const db = require('../db/conection')
const routerMeDatos = express.Router()

routerMeDatos.use(express.json())

routerMeDatos.get('/api/listadelacompra/me/datos', async (req, res) => {
  try {
    let userId = req.user.usuId
    // Consulta SQL para obtener los datos del usuario por ID
    const sqlUsuario = 'SELECT nombre, apellidos FROM materias_primas.usuarios WHERE usuId = ?';
    console.log('linea 15 del meDatos', req.user.usuId );
    db.query(sqlUsuario, [userId], (error, resultsUsuario) => {
      if (error) {
        throw new Error('Error al realizar la consulta de usuario');
      }
      if (resultsUsuario.length > 0) {
        const sqlRecetas = 'SELECT * FROM materias_primas.recetas WHERE usuarioId = ?';
        db.query(sqlRecetas, [userId], (errorRecetas, resultsRecetas) => {
          if (errorRecetas) {
            throw new Error('Error al realizar la consulta de recetas');
          }
  
          const sqlIngredientes = 'SELECT * FROM materias_primas.ingredients WHERE usuarioId = ?';
          db.query(sqlIngredientes, [userId], (errorIngredientes, resultsIngredientes) => {
            if (errorIngredientes) {
              throw new Error('Error al realizar la consulta de ingredientes');
            }
  
            // Enviar los datos del usuario, sus recetas e ingredientes como respuesta
            res.json({
              usuario: resultsUsuario[0],
              recetas: resultsRecetas,
              ingredientes: resultsIngredientes
            });
          });
        });
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
})

  module.exports = routerMeDatos;
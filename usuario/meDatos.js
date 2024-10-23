const express = require('express')
const db = require('../db/conection')
const routerMeDatos = express.Router()

routerMeDatos.use(express.json())

routerMeDatos.get('/api/listadelacompra/me/datos', async (req, res) => {
  try {
    let userId = req.user.usuId
    // Consulta SQL para obtener los datos del usuario por ID
    db.query(sqlUsuario, [userId], (error, resultsUsuario) => {
      if (error) {
        return res.status(500).json({error: 'Error al obtener los datos del usuario' });
      }

      if (!resultsUsuario || resultsUsuario.length === 0) {
        return res.status(404).json({error: 'Usuario no encontrado'});
      }
  
      if (resultsUsuario.length > 0) {
        const sqlRecetas = 'SELECT * FROM materias_primas.recetas WHERE usuarioId = ?';
        db.query(sqlRecetas, [userId], (errorRecetas, resultsRecetas) => {
          if (errorRecetas) {
            return res.status(500).json({error:'Error al realizar la consulta de recetas'});
          }
  
          const sqlIngredientes = 'SELECT * FROM materias_primas.ingredients WHERE usuarioId = ?';
          db.query(sqlIngredientes, [userId], (errorIngredientes, resultsIngredientes) => {
            if (errorIngredientes) {
              return res.status(500).json({error:'Error al realizar la consulta de ingredientes'})
            }
  
            // Enviar los datos del usuario, sus recetas e ingredientes como respuesta
            res.json({
              usuario: resultsUsuario[0],
              recetas: resultsRecetas,
              ingredientes: resultsIngredientes
            });
          });
        });
      } 
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
})

  module.exports = routerMeDatos;
const express = require('express')
const db = require('../db/conection')
const routerMeDatos = express.Router()


routerMeDatos.use(express.json())

routerMeDatos.get('/api/listadelacompra/me/:id/datos', async (req, res) => {
  try {
    let userId = req.params.id; // Obtener el ID del usuario de la URL

    // Consulta SQL para obtener los datos del usuario por ID
    const sqlUsuario = 'SELECT nombre, apellidos FROM usuarios WHERE usuId = ?';

    db.query(sqlUsuario, [userId], (error, resultsUsuario) => {
      if (error) {
        // Manejar el error de la consulta
        throw new Error('Error al realizar la consulta de usuario');
      }

      if (resultsUsuario.length > 0) {
        // Si se encontraron datos del usuario, buscar sus recetas
        const sqlRecetas = 'SELECT * FROM materias_primas.recetas WHERE usuarioId = ?';
        db.query(sqlRecetas, [userId], (errorRecetas, resultsRecetas) => {
          if (errorRecetas) {
            throw new Error('Error al realizar la consulta de recetas');
          }

          // Enviar los datos del usuario y sus recetas como respuesta
          res.json({
            usuario: resultsUsuario[0],
            recetas: resultsRecetas
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
});

module.exports = routerMeDatos;

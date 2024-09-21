const express = require('express')
const db = require('../db/conection')
const routerMeIngredientes = express.Router()

routerMeIngredientes.use(express.json())

routerMeIngredientes.get('/api/listadelacompra/me/:id/ingredientes', (req, res) => {
  try {
    let userId = req.params.id;
    const sqlIngredientes = 'SELECT * FROM ingredientes WHERE usuarioId = ?';

    db.query(sqlIngredientes, [userId], (error, resultsIngredientes) => {
      if (error) { // Corregido de errorIngredientes a error
        throw new Error('Error al realizar la consulta de ingredientes');
      }

      if (resultsIngredientes.length > 0) { // Verificación si hay resultados
        res.json({
          ingredientes: resultsIngredientes
        });
      } else {
        res.status(404).send('Usuario no encontrado o sin ingredientes');
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

routerMeIngredientes.post('/api/listadelacompra/me/:id/ingredientes', (req, res) => {
  try {
    let id = req.params.id;
    let { nombre, tipo, principal, acompañamiento,condimento } = req.body;
    let sql = 'INSERT INTO materias_primas.ingredientes_usuarios (usuarioId, nombre, tipo, principal, acompañamiento, condimento) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [id, nombre, tipo, principal, acompañamiento, condimento], (error, result) => {
      if (error) {
        throw new Error('Error al insertar el ingrediente');
      }

      res.status(201).send('Ingrediente insertado correctamente');
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
})

routerMeIngredientes.delete('/api/listadelacompra/me/:id/ingredientes', (req, res) => {
  try {
    let id = req.params.id;
    let ingredienteId = req.body;
    let sql = 'DELETE FROM materias_primas.ingredientes_usuarios WHERE id = ? AND usuarioId = ?';

    db.query(sql, [ingredienteId, id], (error, result) => {
      if (error) {
        throw new Error('Error al borrar el ingrediente');
      }

      if (result.affectedRows > 0) {
        res.send('Ingrediente eliminado correctamente');
      } else {
        res.status(404).send('Ingrediente no encontrado');
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
})


module.exports = routerMeIngredientes;


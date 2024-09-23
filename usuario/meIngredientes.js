const express = require('express')
const db = require('../db/conection')
const routerMeIngredientes = express.Router()

routerMeIngredientes.use(express.json())

routerMeIngredientes.get('/api/listadelacompra/me/:id/ingredientes', (req, res) => {
  const userId = req.params.id; // Extrae el ID del usuario de los parámetros de la ruta

  // Primera consulta a la tabla ingredients
  let sql = 'SELECT * FROM ingredients WHERE usuarioId = ?';
  let params = [userId];

  // Segunda consulta a la tabla materias_primas.ingredientes_usuarios
  const sqlIngredientes = 'SELECT * FROM materias_primas.ingredientes_usuarios WHERE usuarioId = ?';

  // Ejecuta la primera consulta
  db.query(sql, params, (error, resultadosIngredients) => {
      if (error) {
          return res.status(500).json({ error: 'Error al consultar ingredients' });
      }

      // Ejecuta la segunda consulta
      db.query(sqlIngredientes, [userId], (errorIngredientes, resultadosIngredientesUsuarios) => {
          if (errorIngredientes) {
              return res.status(500).json({ error: 'Error al consultar materias_primas.ingredientes_usuarios' });
          }

          // Combina los resultados de ambas consultas
          const resultadosCombinados = [...resultadosIngredients, ...resultadosIngredientesUsuarios];

          // Envía los resultados combinados al cliente
          res.json(resultadosCombinados);
      });
  });
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

/* routerIngredientes.get('/api/listadelacompra/me/:id/ingredientestotales', (req, res) => {
  const userId = req.params.id; // Extrae el ID del usuario de los parámetros de la ruta

  // Primera consulta a la tabla ingredients
  let sql = 'SELECT * FROM ingredients WHERE usuarioId = ?';
  let params = [userId];

  // Segunda consulta a la tabla materias_primas.ingredientes_usuarios
  const sqlIngredientes = 'SELECT * FROM materias_primas.ingredientes_usuarios WHERE usuarioId = ?';

  // Ejecuta la primera consulta
  db.query(sql, params, (error, resultadosIngredients) => {
      if (error) {
          return res.status(500).json({ error: 'Error al consultar ingredients' });
      }

      // Ejecuta la segunda consulta
      db.query(sqlIngredientes, [userId], (errorIngredientes, resultadosIngredientesUsuarios) => {
          if (errorIngredientes) {
              return res.status(500).json({ error: 'Error al consultar materias_primas.ingredientes_usuarios' });
          }

          // Combina los resultados de ambas consultas
          const resultadosCombinados = [...resultadosIngredients, ...resultadosIngredientesUsuarios];

          // Envía los resultados combinados al cliente
          res.json({ resultados: resultadosCombinados });
      });
  });
}); */
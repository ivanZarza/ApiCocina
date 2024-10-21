const express = require('express');
const db = require('../db/conection');
const routerMeRecetas = express.Router();


routerMeRecetas.use(express.json());

routerMeRecetas.get('/api/listadelacompra/me/recetas', (req, res) => {
  try {
    let userId = req.user.usuId;
    // Consulta SQL para obtener las recetas del usuario por ID
    let sql = 'SELECT * FROM materias_primas.recetas WHERE usuarioId = ?';

    db.query(sql, [userId], (error, results) => {
      if (error) {
        console.error('Error al realizar la consulta de recetas:', error);
        return res.status(500).send('Error al obtener las recetas del usuario');
      }
      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

routerMeRecetas.post('/api/listadelacompra/me/recetas', (req, res) => {
  try {
    let userId = req.user.usuId;
    let datosJSON = JSON.stringify(req.body);
    let sqlInsert = 'INSERT INTO materias_primas.recetas (usuarioId, datosJSON) VALUES (?, ?)';
    db.query(sqlInsert, [userId, datosJSON], async (error, resultados) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      const recetaId = resultados.insertId;
      // Consulta para obtener la receta recién insertada
      let sqlSelect = 'SELECT id, datosJSON FROM materias_primas.recetas WHERE id = ?';
      db.query(sqlSelect, [recetaId], (error, resultados) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
        // Devolver la receta completa
        res.status(201).json({ mensaje: 'Receta añadida con éxito', receta: resultados[0] });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


routerMeRecetas.delete('/api/listadelacompra/me/recetas/:id', (req, res) => {
  try {
    let id = req.user.usuId
    let recetaId = req.params.id;
    console.log('linea 59 del meRecetas', req.user.usuId);
    console.log('linea 60 del meRecetas', req.params.id);
    let sql = 'DELETE FROM materias_primas.recetas WHERE id = ? AND usuarioId = ?';
    db.query(sql, [recetaId, id], (error, resultados) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      if (resultados.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Receta no encontrada' });
      }
      res.status(200).json({ mensaje: 'Receta borrada con éxito' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = routerMeRecetas;

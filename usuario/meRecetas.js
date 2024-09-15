const express = require('express');
const db = require('../db/conection');
const routerMeRecetas = express.Router();


routerMeRecetas.use(express.json());

routerMeRecetas.get('/api/listadelacompra/me/:id/recetas',  (req, res) => {
  try {
    let userId = req.params.id; // Obtener el ID del usuario de la URL
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

routerMeRecetas.post('/api/listadelacompra/me/:id/recetas',  (req, res) => {
  try {
    let id = req.params.id;
    let { datosJSON } = req.body;
    console.log(id,datosJSON);
    let sql = 'INSERT INTO materias_primas.recetas (usuarioId, datosJSON) VALUES (?, ?)';
    db.query(sql, [id, datosJSON], async (error, resultados) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.status(201).send({ mensaje: 'Receta añadida con éxito' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

routerMeRecetas.delete('/api/listadelacompra/me/:id/recetas/:recetaId',  (req, res) => {
  try {
    let recetaId = req.params.recetaId; // Obtener el ID de la receta de la URL
    let id = req.params.id;
    let sql = 'DELETE FROM materias_primas.recetas WHERE id = ?';
    db.query(sql, [recetaId], (error, resultados) => {
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

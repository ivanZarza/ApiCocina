const express = require('express');
const authMiddleware = require('../helpers/authMiddleware');
const routerMeRecetas = express.Router();

routerMeRecetas.use(express.json());

routerMeRecetas.post('/api/listadelacompra/me/:id/recetas', authMiddleware, (req, res) => {
  try{
    const userId = req.params.id; // Obtener el ID del usuario de la URL
    const { id, usuarioId, datosJSON} = req.body;
    console.log({id, usuarioId, datosJSON});
    let sql = 'INSERT INTO materias_primas.recetas (id, usuarioId, datosJSON) VALUES (?, ?, ?)';
    db.query(sql, [id, usuarioId, datosJSON], async (error, resultados) => {
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



module.exports = routerMeRecetas;
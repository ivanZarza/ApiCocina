const express = require('express')
const db = require('../db/conection')
const verificarToken = require('../helpers/authMiddleware');
const routerMeIngredientes = express.Router()

routerMeIngredientes.use(express.json())

routerMeIngredientes.get('/api/listadelacompra/me/ingredientes', (req, res) => {

    const userId = req.user.usuId; // Extrae el ID del usuario de los parámetros de la ruta

    const nombre = req.query.nombre; // Extrae el parámetro de consulta para la búsqueda de texto
    const tipo = req.query.tipo; // Extrae el nuevo parámetro de consulta para filtrar por tipo
    let sql = 'SELECT * FROM ingredients WHERE usuarioId = ? OR usuarioId IS NULL';
    let params = [userId];

    if (nombre) {
        sql += ' AND name LIKE ?';
        params.push(`%${nombre}%`);
    }

    if (tipo) {
        sql += ' AND tipo = ?';
        params.push(tipo);
    }

    let sqlTotal = 'SELECT COUNT(*) AS total FROM ingredients WHERE usuarioId = ? OR usuarioId IS NULL'; 
    db.query(sqlTotal, [userId], (errorTotal, resultadosTotal) => {
        if (errorTotal) {
            return res.status(500).json({ error: 'Error al calcular el total de elementos' });
        }

        const totalElementos = resultadosTotal[0].total;

        const limite = 20;
        const pagina = 'pagina' in req.query ? Number(req.query.pagina) : 1;
        const offset = (pagina - 1) * limite;

        sql += ' LIMIT ? OFFSET ?';
        params.push(limite, offset);

        db.query(sql, params, (error, resultados) => {
            if (error) {
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            res.json({ resultados, totalElementos });
        });
    });
});


routerMeIngredientes.post('/api/listadelacompra/me/ingredientes', (req, res) => {
  try {
    let id = req.user.usuId;
    console.log('linea 53 del meIngredientes', req.user.usuId ); 
    let { nombre, tipo, principal, acompañamiento,condimento } = req.body;
    let sql = 'INSERT INTO materias_primas.ingredients (nombre, tipo, principal, acompañamiento, condimento,usuarioId) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [nombre, tipo, principal, acompañamiento, condimento,id], (error, result) => {
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

routerMeIngredientes.delete('/api/listadelacompra/me/ingredientes', (req, res) => {
  try {
    let id = req.user.usuId;
    let ingredienteId = req.body;
    let sql = 'DELETE FROM materias_primas.ingredients WHERE id = ? AND usuarioId = ?';

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

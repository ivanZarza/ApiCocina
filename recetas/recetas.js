const express = require('express');
const db = require('../db/conection');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const verificarToken = require('../helpers/authMiddleware')

const routerRecetas = express.Router()

routerRecetas.use(cookieParser())
routerRecetas.use(express.json())
routerRecetas.use(verificarToken)

routerRecetas.get('/api/listadelacompra/recetas', verificarToken, async (req, res) => {
  // Obtener el usuario_id del objeto req, que fue añadido por el middleware de autenticación
  const usuarioId = req.usuario.userId;
  let sql = 'SELECT * FROM recetas WHERE usuId = ?';

  try {
      const [results] = await db.query(sql, [usuarioId]);
      res.json(results);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
  }
});

module.exports = routerRecetas;




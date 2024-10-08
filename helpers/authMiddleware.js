// authMiddleware.js
const jwt = require('jsonwebtoken')
const db = require('../db/conection')
require('dotenv').config();



function verificarToken(req, res, next) {
  // Extraer el token de las cookies
  const token = req.cookies['auth_token']

  if (!token) {
    return res.status(401).json({ error: 'Se requiere un token valido para autenticación' })
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const sql = 'SELECT * FROM usuarios WHERE usuId = ?'
    db.query(sql, [decoded.id], (error, results) => {
      if (error) {
        console.error('Error al realizar la consulta:', error);
        return res.status(500).send('Error al obtener los datos del usuario');
      }

      if (results.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }

      req.user = results[0]
      console.log(req.user);
      if (req.user.nombre !== decoded.nombre) {
        return res.status(403).json({ error: 'No tienes los permisos necesarios' })
      }
      next()
    })
  } catch (error) {
    return res.status(403).json({ error: 'No tienes los permisos necesarios  o el token a expirado' })
  }
}

module.exports = verificarToken
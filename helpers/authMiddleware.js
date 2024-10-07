// authMiddleware.js
const jwt = require('jsonwebtoken')
require('dotenv').config();



function verificarToken(req, res, next) {
  // Extraer el token de las cookies
  const token = req.cookies['auth_token']

  if (!token) {
    return res.status(401).json({ error: 'Se requiere un token valido para autenticación' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = decoded
    next()
  } catch (error) {
    return res.status(403).json({ error: 'No tienes los permisos necesarios  o el token a expirado' })
  }
}

module.exports = verificarToken
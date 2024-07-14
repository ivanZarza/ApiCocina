// authMiddleware.js
const jwt = require('jsonwebtoken')

function verificarToken(req, res, next) {
  // Extraer el token de las cookies
  const token = req.cookies['auth_token']

  if (!token) {
    return res.status(403).json({ error: 'Se requiere un token para autenticación' })
  }

  try {
    const decoded = jwt.verify(token, 'tu_secreto_aqui')
    req.usuario = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

module.exports = verificarToken
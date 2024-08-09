const express = require('express')
const routerLogout = express.Router()
const authMiddleware = require('../helpers/authMiddleware')


routerLogout.post('/api/listadelacompra/logout',authMiddleware, (req, res) => {
    res.clearCookie('auth_token')
    res.send('Sesión cerrada')
  })

module.exports = routerLogout;
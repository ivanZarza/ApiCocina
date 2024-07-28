const express = require('express')
const routerLogout = express.Router()


routerLogout.post('/api/listadelacompra/logout', (req, res) => {
    res.clearCookie('auth_token')
    res.send('Sesión cerrada')
  })

module.exports = routerLogout;
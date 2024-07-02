const express = require('express')
const db = require('../db')

const routerEspecias = express.Router()

routerEspecias.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "especia"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

module.exports = routerEspecias

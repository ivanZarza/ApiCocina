const express = require('express')
const db = require('../db')

const routerPescados = express.Router()

routerPescados.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "pescado"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

module.exports = routerPescados
const express = require('express')
const db = require('../db')

const routerPastas = express.Router()

routerPastas.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "pasta"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

module.exports = routerPastas
const express = require('express')
const db = require('../db')

const routerFrutas = express.Router()

routerFrutas.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "fruta"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

module.exports = routerFrutas
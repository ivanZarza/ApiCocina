const express = require('express')
const db = require('../db')

const routerMariscos = express.Router()

routerMariscos.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "marisco"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

module.exports = routerMariscos
const express = require('express')
const db = require('../db')

const routerCereales = express.Router()

routerCereales.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "cereal"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

module.exports = routerCereales
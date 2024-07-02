const express = require('express')
const db = require('../db')

const routerSalsas = express.Router()

routerSalsas.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "salsa"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

module.exports = routerSalsas
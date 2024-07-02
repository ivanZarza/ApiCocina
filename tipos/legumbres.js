const express = require('express')
const db = require('../db')

const routerLegumbres = express.Router()

routerLegumbres.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "legumbre"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
} )

module.exports = routerLegumbres
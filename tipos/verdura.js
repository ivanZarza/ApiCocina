const express = require('express')
const db = require('../db')

const routerVerduras = express.Router()

routerVerduras.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "verdura"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

module.exports = routerVerduras
const express = require('express')
const db = require('../db')

const routerCarnes = express.Router()

routerCarnes.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "carne"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

module.exports = routerCarnes

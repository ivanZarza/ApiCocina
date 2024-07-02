const express = require('express')
const db = require('../db')

const routerFrutosSecos = express.Router()

routerFrutosSecos.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "fruto seco"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

module.exports = routerFrutosSecos
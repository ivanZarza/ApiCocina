const express = require('express')
const db = require('../db')

const routerFrutoSeco = express.Router()

routerFrutoSeco.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "fruto seco"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

module.exports = routerFrutosSecos
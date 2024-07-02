const express = require('express')
const mysql = require('mysql')
const db = require('../db')

db.connect()

const routerLegumbres = express.Router()

routerLegumbres.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "legumbre"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
} )
const express = require('express')
const mysql = require('mysql')
const db = require('../db')

db.connect()

const routerCarnes = express.Router()

routerCarnes.get('/', (req, res) => {
  db.query('SELECT * FROM ingredientes WHERE tipo = "carne"', (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  })
})

const express = require('express')
const db = require('../db')
const routerFrutas = express.Router()

routerFrutas.use(express.json())

routerFrutas.get('/ingredientes/frutas', (req, res) => {
  let sql = 'SELECT * FROM ingredients WHERE tipo = "fruta"'
  db.query(sql, (err, result) => {
  if (err) {
      console.error(err);
      res.status(500).send('Ocurrió un error al procesar su solicitud');
      return;
  }
      console.log(result);
      res.json(result)
  })
})

module.exports = routerFrutas
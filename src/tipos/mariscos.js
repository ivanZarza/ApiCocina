const express = require('express')
const db = require('../db')
const routerMariscos = express.Router()

routerMariscos.use(express.json())

routerMariscos.get('/ingredientes/mariscos', (req, res) => {
  let sql = 'SELECT * FROM ingredients WHERE tipo = "marisco"'
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

module.exports = routerMariscos
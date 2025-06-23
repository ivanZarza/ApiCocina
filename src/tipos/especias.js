const express = require('express')
const db = require('../db')
const routerEspecias = express.Router()

routerEspecias.use(express.json())

routerEspecias.get('/ingredientes/especias', (req, res) => {
  let sql = 'SELECT * FROM ingredients WHERE tipo = "especia"'
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

module.exports = routerEspecias

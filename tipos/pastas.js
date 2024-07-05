const express = require('express')
const db = require('../db')
const routerPastas = express.Router()

routerPastas.use(express.json())

routerPastas.get('/ingredientes/pastas', (req, res) => {
  let sql = 'SELECT * FROM ingredients WHERE tipo = "pasta"'
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


module.exports = routerPastas
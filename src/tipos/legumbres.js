const express = require('express')
const db = require('../db')
const routerLegumbres = express.Router()

routerLegumbres.use(express.json())

routerLegumbres.get('/ingredientes/legumbres', (req, res) => {
  let sql = 'SELECT * FROM ingredients WHERE tipo = "legumbre"'
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

module.exports = routerLegumbres
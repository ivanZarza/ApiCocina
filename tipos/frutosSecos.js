const express = require('express')
const db = require('../db')
const routerFrutosSecos = express.Router()

routerFrutosSecos.use(express.json())

routerFrutosSecos.get('/ingredientes/frutos_secos', (req, res) => {
  let sql = 'SELECT * FROM ingredients WHERE tipo = "fruto seco"'
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

module.exports = routerFrutosSecos
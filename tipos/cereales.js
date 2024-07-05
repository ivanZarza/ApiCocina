const express = require('express')
const db = require('../db')
const routerCereales = express.Router()

routerCereales.use(express.json())

routerCereales.get('/ingredientes/cereales', (req, res) => {
  let sql = 'SELECT * FROM ingredients WHERE tipo = "cereal"'
  db.query(sql, (err, result) => {
    if (err) {
        console.error(err);
        res.status(500).send('Ocurrió un error al procesar su solicitud');
        return;
    }
    res.send(result)
  })
})

module.exports = routerCereales
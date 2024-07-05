const express = require('express')
const db = require('../db')
const routerSalsas = express.Router()

routerSalsas.use(express.json())

routerSalsas.get('/ingredientes/salsas', (req, res) => {
    let sql = 'SELECT * FROM ingredients WHERE tipo = "salsa"'
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

module.exports = routerSalsas 
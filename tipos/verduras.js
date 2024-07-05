const express = require('express')
const db = require('../db')
const routerVerduras = express.Router()

routerVerduras.use(express.json())

routerVerduras.get('/ingredientes/verduras', (req, res) => {
    let sql = 'SELECT * FROM ingredients WHERE tipo = "verdura"'
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

module.exports = routerVerduras
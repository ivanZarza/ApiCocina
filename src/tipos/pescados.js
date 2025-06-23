const express = require('express')
const db = require('../db')
const routerPescados = express.Router()

routerPescados.use(express.json())

routerPescados.get('/ingredientes/pescados', (req, res) => {
    let sql = 'SELECT * FROM ingredients WHERE tipo = "pescado"'
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

module.exports = routerPescados
const express = require('express')
const db = require('../db')
const routerCarnes = express.Router()

routerCarnes.use(express.json())

routerCarnes.get('/ingredientes/carnes', (req, res) => {
    let sql = 'SELECT * FROM ingredients WHERE tipo = "carne"'
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



module.exports = routerCarnes

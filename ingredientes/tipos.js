const express = require('express');
const db = require('../db/conection');
const routerTipos = express.Router();

routerTipos.use(express.json())

routerTipos.get('/api/listadelacompra/ingredientes/tipo', (req, res) => {
    let sql = 'SELECT DISTINCT tipo FROM ingredients';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocurrió un error al procesar su solicitud');
            return;
        }
        console.log(result);
        res.json(result);
    });
});




routerTipos.get('/api/listadelacompra/ingredientes/tipo/:tipo', (req, res) => {
    const tipo = req.params.tipo;
    let sql = 'SELECT * FROM ingredients WHERE tipo = ?';
    db.query(sql, [tipo,], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocurrió un error al procesar su solicitud');
            return;
        }
        console.log(result);
        res.json(result);
    });
});

module.exports = routerTipos;


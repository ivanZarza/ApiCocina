const express = require('express');
const db = require('../db');
const routerTipos = express.Router();

routerTipos.use(express.json())

routerTipos.get('/ingredientes/tipo', (req, res) => {
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

routerTipos.get('/ingredientes/tipo/:tipo', (req, res) => {
    let tipo = req.params.tipo;
    let sql = 'SELECT * FROM ingredients WHERE tipo = ?';
    db.query(sql,[tipo], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocurrió un error al procesar su solicitud');
            return;
        }
        console.log(result);
        res.json(result);
    });
});


routerTipos.get('/ingredientes/tipo/:tipo/:pagina', (req, res) => {
    const limite = 20
    const tipo = req.params.tipo
    const pagina = req.params.pagina ? parseInt(req.params.pagina, 10) : 1
    const offset = (pagina - 1) * limite

    let sql = 'SELECT * FROM ingredients WHERE tipo = ? LIMIT ? OFFSET ?';
    db.query(sql, [tipo,limite, offset], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocurrió un error al procesar su solicitud');
            return;
        }
        console.log(result);
        res.json(result);
    });
})

module.exports = routerTipos;


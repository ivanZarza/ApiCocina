const express = require('express');
const db = require('../db/conection');
const routernIgredientes = express.Router();

routernIgredientes.use(express.json())

routernIgredientes.get('/api/listadelacompra/ingredientes', (req, res) => {

    const nombre = req.query.nombre; // Extrae el parámetro de consulta para la búsqueda de texto
    const tipo = req.query.tipo; // Extrae el nuevo parámetro de consulta para filtrar por tipo
    let sql = 'SELECT * FROM ingredients WHERE usuarioId IS NULL';
    let params = [];

    if (nombre) {
        sql += ' AND name LIKE ?'; // Añade AND para la condición de nombre
        params.push(`%${nombre}%`);
    }

    if (tipo) {
        sql += ' AND tipo = ?'; // Añade AND para la condición de tipo
        params.push(tipo);
    }

        let sqlTotal = 'SELECT COUNT(*) AS total FROM ingredients'; 
        db.query(sqlTotal, (errorTotal, resultadosTotal) => {
            if (errorTotal) {
                // Maneja el error enviando una respuesta de error al cliente
                return res.status(500).json({ error: 'Error al calcular el total de elementos' });
            }
            const totalElementos = resultadosTotal[0].total;

            // Aplica paginación
            const limite = 20;
            const pagina = 'pagina' in req.query ? Number(req.query.pagina) : 1
            // const pagina = parseInt(req.query.pagina, 10) || 1; // Asegura que pagina tenga un valor por defecto
            const offset = (pagina - 1) * limite;

            sql += ' LIMIT ? OFFSET ?';
            params.push(limite, offset);

            db.query(sql, params, (error, resultados) => {
                if (error) {
                    // Maneja el error enviando una respuesta de error al cliente
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }
                // Envía los resultados y el total de elementos al cliente
                res.json({ resultados, totalElementos });
            });
        })
})


routernIgredientes.get('/api/listadelacompra/ingredientes/:id', (req, res) => {
    let sql = 'SELECT * FROM ingredients WHERE id = ?'
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocurrió un error al procesar su solicitud');
            return;
        }
        console.log(result);
        res.json(result);
    });
})

routernIgredientes.post('/api/listadelacompra/ingredientes', (req, res) => {
    let ingredient = req.body;
    let sql = 'INSERT INTO ingredients SET ?';
    db.query(sql, ingredient, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocurrió un error al procesar su solicitud');
            return;
        }
        console.log(result);
        res.json(result);
    });
})

routernIgredientes.put('/api/listadelacompra/ingredientes/:id', (req, res) => {
    let sql = 'UPDATE ingredients SET ? WHERE id = ?';
    db.query(sql, [req.body, req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocurrió un error al procesar su solicitud');
            return;
        }
        console.log(result);
        res.json(result);
    });
})

routernIgredientes.delete('/api/listadelacompra/ingredientes/:id', (req, res) => {
    let sql = 'DELETE FROM ingredients WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocurrió un error al procesar su solicitud');
            return;
        }
        console.log(result);
        res.json(result);
    });
})

module.exports = routernIgredientes
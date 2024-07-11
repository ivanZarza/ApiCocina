const express = require('express')
const db = require('./db')
const app = express()
const cors = require('cors')

app.use(cors(), cookieParser(), express.json())

const routerRegistro = require('./login/registro')
routerRegistro.use(express.json)

const routerLogin = require('./login/login')
app.use(routerLogin)

const routerTipos = require('./tipos/tipos')
app.use(routerTipos)



app.get('/ingredientes', (req, res) => {
    const nombre = req.query.nombre; // Extrae el parámetro de consulta para la búsqueda de texto
    const tipo = req.query.tipo; // Extrae el nuevo parámetro de consulta para filtrar por tipo
    let sql = 'SELECT * FROM ingredients';
    let params = [];

    if (nombre) {
        sql += ' WHERE name LIKE ?';
        params.push(`%${nombre}%`);
    }

    // Añade la condición para filtrar por tipo si el parámetro tipo está presente
    if (tipo) {
        if (nombre) {
            sql += ' AND'; // Si ya hay una condición WHERE, añade AND para la siguiente condición
        } else {
            sql += ' WHERE'; // Si no hay una condición WHERE, la añade
        }
        sql += ' tipo = ?';
        params.push(tipo);
    }

    if (!req.query.pagina) {
        // Ejecuta la consulta sin límite ni desplazamiento
        db.query(sql, params, (error, resultados) => {
            if (error) {
                // Maneja el error enviando una respuesta de error al cliente
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            // Envía los resultados al cliente
            res.json(resultados);
        })
    } else {
        // Aplica paginación
        const limite = 25;
        const pagina = parseInt(req.query.pagina, 10) || 1; // Asegura que pagina tenga un valor por defecto
        const offset = (pagina - 1) * limite;

        sql += ' LIMIT ? OFFSET ?';
        params.push(limite, offset);

        db.query(sql, params, (error, resultados) => {
            if (error) {
                // Maneja el error enviando una respuesta de error al cliente
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            // Envía los resultados al cliente
            res.json(resultados);
        });
    }
});


app.get('/ingredientes/:id', (req, res) => {   
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

app.post('/ingredientes', (req, res) => {
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

app.put('/ingredientes/:id', (req, res) => {
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

app.delete('/ingredientes/:id', (req, res) => {
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



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})


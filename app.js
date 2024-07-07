const express = require('express')
const db = require('./db')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

const routerTipos = require('./tipos/tipos')
app.use(routerTipos)

const routerCarnes = require('./tipos/carnes')
app.use(routerCarnes)

const routerCereales = require('./tipos/cereales')
app.use(routerCereales)

const routerEspecias = require('./tipos/especias')
app.use(routerEspecias)

const routerFrutas = require('./tipos/frutas')
app.use(routerFrutas)

const routerFrutosSecos = require('./tipos/frutosSecos')
app.use(routerFrutosSecos)

const routerLegumbres = require('./tipos/legumbres')
app.use(routerLegumbres)

const routerMariscos = require('./tipos/mariscos')
app.use(routerMariscos)

const routerPastas = require('./tipos/pastas')
app.use(routerPastas)

const routerPescados = require('./tipos/pescados')
app.use(routerPescados)

const routerSalsas = require('./tipos/salsas')
app.use(routerSalsas)

const routerVerduras = require('./tipos/verduras')
app.use(routerVerduras)


app.get('/ingredientes', (req, res) => {
    const nombre = req.query.nombre; // Extrae el parámetro de consulta para la búsqueda de texto
    let sql = 'SELECT * FROM ingredients';
    let params = [];

    if (nombre) {
        sql += ' WHERE name LIKE ?';
        params.push(`%${nombre}%`);
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
        });
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


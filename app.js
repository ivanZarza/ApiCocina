const express = require('express')
const db = require('./db')
const app = express()

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


app.get('/', (req, res) => {        
    res.send('Bienvenido a la API de Materias Primas')
})

app.get('/ingredientes', (req, res) => {
    let sql = 'SELECT * FROM ingredients'
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocurrió un error al procesar su solicitud');
            return;
        }
        console.log(result);
        res.json(result);
    });
})

app.get('/ingredientes/pagina/:pagina', (req, res) => {
    const limite = 25
    const pagina = req.params.pagina
    const offset = (pagina - 1) * limite

    let sql = 'SELECT * FROM ingredients LIMIT ? OFFSET ?';
    db.query(sql, [limite, offset], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocurrió un error al procesar su solicitud');
            return;
        }
        console.log(result);
        res.json(result);
    });
})


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


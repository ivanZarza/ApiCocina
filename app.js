const express = require('express')
const db = require('./db')

const app = express()


const routerTipos = express.Router()
app.use('ingredientes/tipo', routerTipos)


app.get('/', (req, res) => {        
    res.send('Bienvenido a la API de Materias Primas')
})

app.get('/ingredientes', (req, res) => {
    let sql = 'SELECT * FROM ingredients'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result);
        res.json(result)
    })
})

app.get('/ingredientes/tipo', (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})


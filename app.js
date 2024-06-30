const express = require('express')
const mysql = require('mysql')

const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '3st3v3Z99!',
    database: 'materias_primas'
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected to database')
})

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

app.get('/ingredientes/tipo:marisco', (req, res) => {
    let sql = 'SELECT * FROM ingredients WHERE tipo = "marisco"'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result);
        res.json(result)
    })
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
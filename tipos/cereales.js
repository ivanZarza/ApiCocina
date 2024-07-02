const express = require('express')
const mysql = require('mysql')

const routerCereales = express.Router()

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

routerCereales.get('/', (req, res) => {
    db.query('SELECT * FROM ingredientes WHERE tipo = "cereal"', (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
})
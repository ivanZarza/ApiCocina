const express = require('express')
const mysql = require('mysql')

const routerFrutoSeco = express.Router()

const express = require('express')
const mysql = require('mysql')

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

routerFrutoSeco.get('/', (req, res) => {
    db.query('SELECT * FROM ingredientes WHERE tipo = "fruto seco"', (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
})
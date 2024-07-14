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


module.exports = db;
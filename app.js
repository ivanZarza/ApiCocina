const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors(), express.json())
app.use(require('./login/registro'))
app.use(require('./login/login&logout'))
app.use(require('./ingredientes/tipos'))
app.use(require('./ingredientes/ingredientes'))
app.use(require('./recetas/recetas'))


app.get('/api/listadelacompra', (req, res) => {
    res.send('¡Bienvenido a la API de tu lista de la compra!')
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})


const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authMiddleware = require('./helpers/authMiddleware')

// Configuración de CORS para permitir cualquier origen y aceptar credenciales
const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true); // Permitir cualquier origen
    },
    credentials: true, // Permitir credenciales
};

app.use(cors(corsOptions), express.json(), cookieParser())
app.use(require('./login/registro'))
app.use(require('./login/login'))
app.use(require('./ingredientes/tipos'))
app.use(require('./ingredientes/ingredientes'))
app.use(require('./recetas/recetas'))
app.use(require('./login/logout'))
app.use(require('./usuario/me'))
app.use(require('./usuario/meDatos'))
app.use(require('./usuario/meRecetas'))
app.use(require('./usuario/meIngredientes'))

/* app.use(authMiddleware) */

app.get('/api/listadelacompra', (req, res) => {
    res.send('¡Bienvenido a la API de tu lista de la compra!')
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})


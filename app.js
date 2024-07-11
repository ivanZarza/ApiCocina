const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors(), express.json())

const routerRegistro = require('./login/registro')
app.use(routerRegistro)

const routerLogin = require('./login/login')
app.use(routerLogin)

const routerTipos = require('./tipos/tipos')
app.use(routerTipos)

const routerIngredientes = require('./ingredientes/ingredientes')
app.use(routerIngredientes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})


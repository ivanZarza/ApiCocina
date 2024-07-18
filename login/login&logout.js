const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const db = require('../db/conection')
const routerLogin = express.Router()

const { promisify } = require('util')
const dbQuery = promisify(db.query.bind(db))

routerLogin.use(express.json())
routerLogin.use(cookieParser())

routerLogin.post('/api/listadelacompra/login', async (req, res) => {
  const { nombre, apellidos, contraseña } = req.body;
  console.log(nombre, apellidos, contraseña);
  let sql = 'SELECT * FROM usuarios WHERE nombre = ? AND apellidos = ?';

  db.query(sql, [nombre, apellidos], (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error en el servidor')
      return
    }

    console.log('results', results)

    if (results.length === 0) {
      res.status(404).send('Usuario no encontrado')
      return
    }

    const [user] = results

    console.log('user is', `${user.nombre} ${user.apellidos}`)

    bcrypt.compare(contraseña, user.contraseña, (err, match) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error en el servidor')
        return
      }

      if (!match) {
        res.status(401).send('Contraseña incorrecta')
        return
      }

      const token = jwt.sign({ userId: user.id }, 'tu_secreto_aqui', { expiresIn: '1h' })

      const userData = {
        id: user.usuId,
        nombre: user.nombre,
        apellidos: user.apellidos,
      }
      
      res.cookie('auth_token', token, { httpOnly: true, secure: true })
      res.send({mensaje: 'Inicio de sesión exitoso', user: userData})
    }
    )
  })

  // try {
  //   // Ejecutar la consulta a la base de datos
  //   const result = await db.query(sql, [nombre, apellidos]);
  //   console.log(result);
  //   // Asegúrate de que result tiene la estructura esperada
  //   const users = result[0];
  // console.log(users);
  //   // Verificar si se encontró algún usuario
  //   if (users.length === 0) {
  //     return res.status(404).send('Usuario no encontrado');
  //   }
    
  //   const user = users[0];
  //   console.log(user);
  //   // Comparar la contraseña proporcionada con la almacenada
  //   const match = await bcrypt.compare(contraseña, user.contraseña);
  //   if (!match) {
  //     return res.status(401).send('Contraseña incorrecta');
  //   }

  //   // Generar el token JWT
  //   const token = jwt.sign({ userId: user.id }, 'tu_secreto_aqui', { expiresIn: '1h' })

  //   // Preparar los datos del usuario para enviar, excluyendo la contraseña
  //   const userData = {
  //     id: user.usuId,
  //     nombre: user.nombre,
  //     apellidos: user.apellidos,
  //     // Agrega aquí más campos según sea necesario, excluyendo siempre la contraseña
  //   }


  //   // Enviar el token en una cookie
  //   res.cookie('auth_token', token, { httpOnly: true, secure: true })
  //   res.send({mensaje: 'Inicio de sesión exitoso', user: userData})
  // } catch (error) {
  //   // Manejar posibles errores de la consulta o de bcrypt
  //   console.error(error)
  //   res.status(500).send('Error en el servidor')
  // }
})




routerLogin.post('/api/listadelacompra/logout', (req, res) => {
  // Elimina la cookie que contiene el token JWT
  res.clearCookie('auth_token')
  // Opcionalmente, puedes redirigir al usuario a la página de inicio de sesión o enviar una respuesta
  res.redirect('/login')
})

module.exports = routerLogin

/* CONTRASE ÑA PARA ivan zarza estevez3ST3V3z99! */

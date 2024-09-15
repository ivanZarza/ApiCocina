const express = require('express')
const db = require('../db/conection')
const routerMeIngredientes = express.Router()

routerMeIngredientes.use(express.json())

routerMeIngredientes.get('/api/listadelacompra/me/:id/ingredientes', (req, res) => {
  try{
    let 
  }
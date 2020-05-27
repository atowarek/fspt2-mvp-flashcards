const express = require('express')

const db = require('./lib/db')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send({
    message: 'hola api',
  })
})

routes.get('/users', (req, res) => {
  db(`SELECT * FROM users`).then(results => {
    if (results.error) {
      res.status(400).send({ message: 'There was an error' })
    }
    res.send(results.data)
  })
})

module.exports = routes

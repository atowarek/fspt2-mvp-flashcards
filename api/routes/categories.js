const express = require('express')
//const db = require('../lib/db')
const routes = express.Router()
const fetch = require('node-fetch')

routes.get('/', (req, res) => {
  fetch('https://opentdb.com/api_category.php')
    .then(response => response.json())
    .then(response => {
      const parsedData = response.trivia_categories.map(({ id, name }) => {
        return {
          id,
          name,
        }
      })
      res.send(parsedData)
      // res.send(response)
    })
})

module.exports = routes

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const apiGamesRoutes = require('./routes/games')
const apiTriviaCategoryRoutes = require('./routes/categories')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/games', apiGamesRoutes)
app.use('/api/categories', apiTriviaCategoryRoutes)

app.get('/api', (req, res) => {
  res.send({
    message: 'hola',
  })
})

app.listen(process.env.API_PORT, () => {
  console.log(`Starting server in PORT ${process.env.API_PORT}`)
})

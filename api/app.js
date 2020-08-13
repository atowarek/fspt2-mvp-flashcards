require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const clientPath = path.join(__dirname, '../', 'client', 'build')
const apiGamesRoutes = require('./routes/games')
const apiTriviaCategoryRoutes = require('./routes/categories')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(clientPath))

app.use('/api/games', apiGamesRoutes)
app.use('/api/categories', apiTriviaCategoryRoutes)

// app.get('/api', (req, res) => {
//   res.send({
//     message: 'hello',
//   })
// })

app.get('/*', function (req, res) {
  res.sendFile(path.join(clientPath, 'index.html'))
})

app.listen(process.env.PORT, () => {
  console.log(`Starting server in PORT ${process.env.PORT}`)
})

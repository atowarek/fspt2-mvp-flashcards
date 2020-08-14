require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const clientPath = path.join(__dirname, '../', 'client', 'build')

const apiRoutes = require('./routes/routes')

const app = express()
app.use(express.static(clientPath))

app.use(cors())
app.use(bodyParser.json())

app.use('/api', apiRoutes)

app.get('/*', function (req, res) {
  res.sendFile(path.join(clientPath, 'index.html'))
})

//app.use(express.static('./client/public/img'))

app.listen(process.env.PORT, () => {
  console.log(`Starting server in PORT ${process.env.PORT}`)
})

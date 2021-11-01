const express = require('express')
const app = express()
const {port} = require('./app/config')
const apiRouter = require('./app/routes/api')
const bodyParser = require('body-parser')
const Cors = require('cors')

// db
require('./app/db/mongoose')

// pasery
app.use(Cors());
app.use(bodyParser.json())

// routes
app.use('/api', apiRouter)

// server
app.listen(port, function () {
    console.log('server' + port)
})
const express = require('express');
const cors = require('cors');
require('./db/mongoose')
const usersRouter = require('./routers/users')

const app = express()

app.use(express.json())
app.use(cors())
app.use(usersRouter)

module.exports = app
